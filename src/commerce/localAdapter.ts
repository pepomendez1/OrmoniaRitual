import { getProductById } from "@/data/products";
import {
  MAX_LINE_QUANTITY,
  type Cart,
  type CartLine,
  type CartLineInput,
  type CommerceAdapter,
} from "./types";

/**
 * Adapter local — DEMO FRONTEND.
 *
 * Guarda líneas mínimas (`productId`, `merchandiseId`, `quantity`) en
 * localStorage y resuelve precio desde el catálogo en cada lectura, así un
 * cambio de precio en `data/products.ts` se refleja sin carritos viejos con
 * montos congelados. No hay checkout: `checkoutUrl` es siempre `null`.
 *
 * Si el almacenamiento está bloqueado (modo privado estricto), el carrito
 * funciona en memoria durante la visita.
 */

const STORAGE_KEY = "ormonia:cart:v1";

interface StoredLine {
  id: string;
  productId: string;
  merchandiseId: string;
  quantity: number;
}

let memory: StoredLine[] = [];

function read(): StoredLine[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return memory;
    const parsed = JSON.parse(raw) as StoredLine[];
    // Descarta líneas de productos que ya no existen en el catálogo.
    memory = Array.isArray(parsed)
      ? parsed.filter((line) => getProductById(line.productId))
      : [];
  } catch {
    // Sin almacenamiento o JSON corrupto: se sigue con lo que hay en memoria.
  }
  return memory;
}

function write(lines: StoredLine[]) {
  memory = lines;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  } catch {
    // Sin almacenamiento: el carrito vive solo en esta pestaña.
  }
}

const clamp = (n: number) => Math.max(1, Math.min(MAX_LINE_QUANTITY, Math.round(n)));

function toCart(stored: StoredLine[]): Cart {
  const lines: CartLine[] = stored.map((line) => {
    const price = getProductById(line.productId)?.price ?? null;
    return {
      ...line,
      unitPrice: price,
      lineTotal: price == null ? null : price * line.quantity,
    };
  });

  return {
    id: "local",
    lines,
    totalQuantity: lines.reduce((sum, line) => sum + line.quantity, 0),
    subtotal: lines.reduce((sum, line) => sum + (line.lineTotal ?? 0), 0),
    hasUnpricedLines: lines.some((line) => line.unitPrice == null),
    checkoutUrl: null,
  };
}

export const localAdapter: CommerceAdapter = {
  provider: "local",

  async getCart() {
    return toCart(read());
  },

  async addLines(inputs: CartLineInput[]) {
    const lines = [...read()];
    for (const input of inputs) {
      const existing = lines.find((l) => l.merchandiseId === input.merchandiseId);
      if (existing) {
        existing.quantity = clamp(existing.quantity + input.quantity);
      } else {
        lines.push({
          id: `line-${input.merchandiseId}`,
          productId: input.productId,
          merchandiseId: input.merchandiseId,
          quantity: clamp(input.quantity),
        });
      }
    }
    write(lines);
    return toCart(lines);
  },

  async updateLine(lineId: string, quantity: number) {
    const lines = read()
      .map((line) => (line.id === lineId ? { ...line, quantity } : line))
      .filter((line) => line.quantity > 0)
      .map((line) => ({ ...line, quantity: clamp(line.quantity) }));
    write(lines);
    return toCart(lines);
  },

  async removeLine(lineId: string) {
    const lines = read().filter((line) => line.id !== lineId);
    write(lines);
    return toCart(lines);
  },
};

/** Para sincronizar pestañas: el provider escucha `storage` con esta clave. */
export const LOCAL_CART_STORAGE_KEY = STORAGE_KEY;
