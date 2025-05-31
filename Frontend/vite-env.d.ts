/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  readonly DEV: boolean;
  readonly MODE: string;
  readonly PROD: boolean;
  // puedes agregar más si usas otras variables
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
