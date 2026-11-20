import { Link } from "react-router-dom";
import type { Product } from "@/data/products";
import { pdpCopy } from "@/data/pdpCopy";
import { InfoList, type InfoSection } from "./InfoSections";

/** Arma las secciones con datos reales del producto; omite las vacías. */
export function buildInfoSections(
  product: Product,
  options: { description?: boolean; actives?: boolean; extra?: InfoSection[] } = {}
): InfoSection[] {
  const { description = true, actives = true, extra = [] } = options;
  const s = pdpCopy.sections;
  const out: InfoSection[] = [];

  if (description && (product.description || product.details?.length)) {
    out.push({
      id: "description",
      title: s.description,
      content: (
        <div className="flex max-w-[620px] flex-col gap-3">
          <p>{product.description}</p>
          {product.details?.map((p) => <p key={p}>{p}</p>)}
        </div>
      ),
    });
  }
  if (actives && product.ingredients.length > 0) {
    out.push({ id: "actives", title: s.actives, content: <InfoList items={product.ingredients} /> });
  }
  out.push(...extra);
  if (product.howToUse?.length) {
    out.push({
      id: "how",
      title: s.howToUse,
      content: (
        <ol className="flex flex-col gap-3">
          {product.howToUse.map((step, i) => (
            <li key={step} className="flex gap-4">
              <span className="font-sans text-[11px] tabular-nums text-ink/50">
                {String(i + 1).padStart(2, "0")}
              </span>
              {step}
            </li>
          ))}
        </ol>
      ),
    });
  }
  if (product.texture) {
    out.push({ id: "texture", title: s.texture, content: <p>{product.texture}</p> });
  }
  if (product.inci) {
    out.push({ id: "inci", title: s.inci, content: <p className="text-[12px]">{product.inci}</p> });
  }
  if (product.specs?.length) {
    out.push({
      id: "specs",
      title: s.specs,
      content: (
        <dl className="grid grid-cols-[minmax(0,1fr)_minmax(0,2fr)] gap-x-6 gap-y-2">
          {product.specs.map((spec) => (
            <div key={spec.label} className="contents">
              <dt className="text-ink/60">{spec.label}</dt>
              <dd>{spec.value}</dd>
            </div>
          ))}
        </dl>
      ),
    });
  }
  if (product.faq?.length) {
    out.push({
      id: "faq",
      title: s.faq,
      content: (
        <dl className="flex flex-col gap-5">
          {product.faq.map((item) => (
            <div key={item.question}>
              <dt className="font-medium text-ink">{item.question}</dt>
              <dd className="mt-1.5">{item.answer}</dd>
            </div>
          ))}
        </dl>
      ),
    });
  }
  out.push({
    id: "shipping",
    title: s.shipping,
    content: (
      <div className="flex flex-col gap-3">
        {pdpCopy.shipping.body.map((p) => (
          <p key={p}>{p}</p>
        ))}
        <p className="flex flex-wrap gap-x-5 gap-y-1">
          {pdpCopy.shipping.links.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className="font-sans text-[11px] uppercase tracking-[0.18em] text-ink underline underline-offset-4"
            >
              {link.label}
            </Link>
          ))}
        </p>
      </div>
    ),
  });
  return out;
}
