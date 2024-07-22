/// <reference types="vite/client" />

export interface Environment {
  apiBaseUrl: string;
  clerkPublishableKey: string;
}

declare global {
  interface Window {
    env: Environment;
  }
}
