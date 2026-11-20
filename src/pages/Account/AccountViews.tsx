import { Link } from "react-router-dom";
import type { Customer, Order } from "@/commerce/account";
import { getProductById, productHref } from "@/data/products";
import { accountCopy, priceCopy } from "@/data/shopCopy";
import { ProductVisual } from "@/components/shop/ProductVisual";
import { brandButton, eyebrowClass } from "@/lib/brandButton";
import { formatPrice } from "@/lib/price";

const date = (iso: string) =>
  new Date(`${iso}T12:00:00`).toLocaleDateString("es-AR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

const money = (value: number | null) => (value == null ? priceCopy.pending : formatPrice(value));

export function OrderRow({ order }: { order: Order }) {
  const units = order.lines.reduce((n, l) => n + l.quantity, 0);
  return (
    <li className="border-b border-ink/12">
      <Link
        to={`/account/pedidos/${order.id}`}
        className="group grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 py-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto_auto] md:gap-8"
      >
        <span>
          <span className="block font-sans text-[12px] uppercase tracking-[0.16em] text-ink">
            {accountCopy.orderLabel(order.number)}
          </span>
          <span className="mt-1 block font-sans text-[12px] text-ink/62">{date(order.date)}</span>
        </span>
        <span className="hidden font-sans text-[12px] text-ink/72 md:block">{order.status}</span>
        <span className="hidden font-sans text-[12px] text-ink/62 md:block">
          {units} {units === 1 ? "producto" : "productos"}
        </span>
        <span className="font-sans text-[13px] tabular-nums text-ink group-hover:underline group-hover:underline-offset-4">
          {money(order.total)}
        </span>
      </Link>
    </li>
  );
}

export function Summary({ customer }: { customer: Customer }) {
  const [last] = customer.orders;
  return (
    <div className="flex flex-col gap-12">
      <div>
        <h2 className="font-sans text-[clamp(1.6rem,4vw,2rem)] leading-[1.1] tracking-[-0.015em]">
          {accountCopy.greeting(customer.firstName)}
        </h2>
        <p className="mt-3 font-sans text-[14px] text-ink/64">{accountCopy.summaryBody}</p>
      </div>
      <section aria-labelledby="last-order">
        <h3 id="last-order" className={`${eyebrowClass} text-ink/62`}>
          {accountCopy.lastOrder}
        </h3>
        {last ? (
          <ul className="mt-3 border-t border-ink/12">
            <OrderRow order={last} />
          </ul>
        ) : (
          <p className="mt-4 font-sans text-[14px] text-ink/64">{accountCopy.noOrders}</p>
        )}
      </section>
    </div>
  );
}

export function Orders({ orders }: { orders: Order[] }) {
  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-start gap-6">
        <p className="font-sans text-[14px] text-ink/64">{accountCopy.noOrders}</p>
        <Link to="/products" className={brandButton({ variant: "secondary" })}>
          Ir a la tienda
        </Link>
      </div>
    );
  }
  return (
    <ul className="border-t border-ink/12">
      {orders.map((order) => (
        <OrderRow key={order.id} order={order} />
      ))}
    </ul>
  );
}

export function OrderDetail({ order }: { order: Order | undefined }) {
  if (!order) {
    return (
      <div className="flex flex-col items-start gap-6">
        <p className="font-sans text-[14px] text-ink/64">{accountCopy.orderNotFound}</p>
        <Link to="/account?seccion=pedidos" className={brandButton({ variant: "quiet" })}>
          {accountCopy.backToOrders}
        </Link>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-10">
      <div>
        <Link to="/account?seccion=pedidos" className={brandButton({ variant: "quiet" })}>
          {accountCopy.backToOrders}
        </Link>
        <h2 className="mt-8 font-sans text-[clamp(1.6rem,4vw,2rem)] leading-[1.1] tracking-[-0.015em]">
          {accountCopy.orderLabel(order.number)}
        </h2>
        <p className="mt-2 font-sans text-[13px] text-ink/62">
          {date(order.date)} · {order.status}
        </p>
      </div>

      <section aria-labelledby="order-items">
        <h3 id="order-items" className={`${eyebrowClass} text-ink/62`}>
          {accountCopy.items}
        </h3>
        <ul className="mt-3 border-t border-ink/12">
          {order.lines.map((line) => {
            const product = getProductById(line.productId);
            if (!product) return null;
            return (
              <li
                key={line.productId}
                className="grid grid-cols-[72px_minmax(0,1fr)_auto] items-center gap-4 border-b border-ink/12 py-4"
              >
                <ProductVisual product={product} compact className="aspect-[4/5] rounded-[10px]" />
                <span>
                  <Link
                    to={productHref(product)}
                    className="font-sans text-[12px] uppercase tracking-[0.16em] text-ink hover:underline"
                  >
                    {product.name}
                  </Link>
                  <span className="mt-1 block font-sans text-[12px] text-ink/62">× {line.quantity}</span>
                </span>
                <span className="font-sans text-[13px] tabular-nums text-ink">
                  {line.unitPrice == null ? priceCopy.pending : formatPrice(line.unitPrice * line.quantity)}
                </span>
              </li>
            );
          })}
        </ul>
        <div className="flex items-baseline justify-between py-5">
          <span className="font-sans text-[11px] uppercase tracking-[0.2em]">{accountCopy.total}</span>
          <span className="font-sans text-[15px] tabular-nums">{money(order.total)}</span>
        </div>
      </section>

      <section aria-labelledby="order-address">
        <h3 id="order-address" className={`${eyebrowClass} text-ink/62`}>
          {accountCopy.shippingAddress}
        </h3>
        <address className="mt-3 font-sans text-[14px] not-italic leading-relaxed text-ink/80">
          {order.shippingAddress.lines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </address>
      </section>
    </div>
  );
}

export function Profile({ customer }: { customer: Customer }) {
  return (
    <div className="flex flex-col gap-12">
      <section aria-labelledby="profile-data">
        <h2 id="profile-data" className={`${eyebrowClass} text-ink/62`}>
          {accountCopy.profile}
        </h2>
        <dl className="mt-4 grid max-w-[520px] grid-cols-[120px_minmax(0,1fr)] gap-y-3 border-t border-ink/12 pt-4 font-sans text-[14px]">
          <dt className="text-ink/62">Nombre</dt>
          <dd>
            {customer.firstName} {customer.lastName}
          </dd>
          <dt className="text-ink/62">Email</dt>
          <dd>{customer.email}</dd>
        </dl>
      </section>
      <section aria-labelledby="profile-addresses">
        <h2 id="profile-addresses" className={`${eyebrowClass} text-ink/62`}>
          {accountCopy.addresses}
        </h2>
        <ul className="mt-4 grid gap-4 sm:grid-cols-2">
          {customer.addresses.map((address) => (
            <li key={address.id} className="rounded-[16px] border border-ink/14 p-5">
              <p className="flex items-center gap-3 font-sans text-[12px] uppercase tracking-[0.16em]">
                {address.name}
                {address.isDefault && (
                  <span className="rounded-full border border-ink/20 px-2 py-0.5 text-[9px] tracking-[0.16em] text-ink/62">
                    {accountCopy.defaultAddress}
                  </span>
                )}
              </p>
              <address className="mt-3 font-sans text-[13px] not-italic leading-relaxed text-ink/72">
                {address.lines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </address>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
