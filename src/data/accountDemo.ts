import type { Customer } from "@/commerce/account";

/**
 * ⚠️ DATOS DE DEMOSTRACIÓN — NO SON DE PRODUCCIÓN.
 *
 * Existen solo para revisar el diseño de /account con sesión. No representan
 * a ninguna persona ni a ningún pedido real; la UI lo declara con un aviso
 * permanente. Se cargan bajo demanda y únicamente en modo demo
 * (`commerce/account.ts`). Borrar este archivo al conectar Shopify.
 */
export const demoCustomer: Customer = {
  firstName: "Demo",
  lastName: "ORMONIA",
  email: "demo@ejemplo.com",
  addresses: [
    {
      id: "addr-1",
      name: "Casa",
      lines: ["Calle de ejemplo 1234", "Ciudad de ejemplo", "Argentina"],
      isDefault: true,
    },
    {
      id: "addr-2",
      name: "Trabajo",
      lines: ["Avenida de ejemplo 567, piso 2", "Ciudad de ejemplo", "Argentina"],
    },
  ],
  orders: [
    {
      id: "demo-1002",
      number: "DEMO-1002",
      date: "2026-10-12",
      status: "Pedido de ejemplo · En preparación",
      lines: [
        { productId: "bloom", quantity: 1, unitPrice: 55000 },
        { productId: "restore", quantity: 1, unitPrice: 55000 },
      ],
      total: 110000,
      shippingAddress: {
        id: "addr-1",
        name: "Casa",
        lines: ["Calle de ejemplo 1234", "Ciudad de ejemplo", "Argentina"],
      },
    },
    {
      id: "demo-1001",
      number: "DEMO-1001",
      date: "2026-09-03",
      status: "Pedido de ejemplo · Entregado",
      lines: [{ productId: "clarity", quantity: 2, unitPrice: 55000 }],
      total: 110000,
      shippingAddress: {
        id: "addr-1",
        name: "Casa",
        lines: ["Calle de ejemplo 1234", "Ciudad de ejemplo", "Argentina"],
      },
    },
  ],
};
