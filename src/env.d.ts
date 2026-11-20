/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ENTER_ANALYTICS_ENABLED?: string;
  readonly VITE_ENTER_ANALYTICS_TOKEN?: string;
  readonly VITE_ENTER_PROJECT_ID?: string;
  readonly VITE_ENTER_ANALYTICS_ENDPOINT?: string;
  readonly VITE_ENTER_ANALYTICS_DEFINITIONS_ENDPOINT?: string;
  readonly VITE_ENTER_ANALYTICS_DEBUG?: string;
  /** Dominio público definitivo (sin barra final). Habilita canonical y og:url. */
  readonly VITE_SITE_URL?: string;
  /** Shopify — todavía sin uso. Ver src/commerce/README.md. */
  readonly VITE_SHOPIFY_STORE_DOMAIN?: string;
  readonly VITE_SHOPIFY_STOREFRONT_TOKEN?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
