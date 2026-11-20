/**
 * Cuenta de cliente — contrato.
 *
 * El acceso real será Shopify Customer Accounts (passwordless: código por
 * email, con la Customer Account API). No hay credenciales todavía, así que
 * no existe sesión real: `getSession()` devuelve "sin sesión", salvo que la
 * persona elija recorrer el MODO DEMO, que carga datos ficticios desde
 * `data/accountDemo.ts` y lo declara en pantalla.
 *
 * Al conectar Shopify: `startSignIn()` redirige al login de Customer
 * Accounts, `getSession()` lee el token y `fetchCustomer()` consulta la API.
 * Las vistas de `/account` no cambian.
 */

export interface Address {
  id: string;
  name: string;
  lines: string[];
  isDefault?: boolean;
}

export interface OrderLine {
  productId: string;
  quantity: number;
  unitPrice: number | null;
}

export interface Order {
  id: string;
  number: string;
  /** ISO date. */
  date: string;
  status: string;
  lines: OrderLine[];
  total: number | null;
  shippingAddress: Address;
}

export interface Customer {
  firstName: string;
  lastName: string;
  email: string;
  addresses: Address[];
  orders: Order[];
}

export type AccountSession =
  | { status: "signedOut" }
  | { status: "signedIn"; customer: Customer; demo: boolean };

const DEMO_KEY = "ormonia:account-demo";

/** Hoy no hay login real: solo existe la sesión demo explícita. */
export async function getSession(): Promise<AccountSession> {
  let demo = false;
  try {
    demo = sessionStorage.getItem(DEMO_KEY) === "1";
  } catch {
    demo = false;
  }
  if (!demo) return { status: "signedOut" };
  // Import diferido: la data ficticia no viaja en el bundle de nadie que no la pida.
  const { demoCustomer } = await import("@/data/accountDemo");
  return { status: "signedIn", customer: demoCustomer, demo: true };
}

export function startDemoSession() {
  try {
    sessionStorage.setItem(DEMO_KEY, "1");
  } catch {
    // Sin almacenamiento la demo dura lo que dure el estado en memoria.
  }
}

export function endSession() {
  try {
    sessionStorage.removeItem(DEMO_KEY);
  } catch {
    // Nada que limpiar.
  }
}

/** Login real. Sin Shopify no hay a dónde redirigir. */
export const signInAvailable = false;
