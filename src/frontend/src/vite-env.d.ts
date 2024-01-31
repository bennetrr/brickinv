/// <reference types="vite/client" />

export interface Environment {
  apiBaseUrl: string;
}

declare global {
  interface Window {
    env: Environment;
  }
}
