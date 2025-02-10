/// <reference types="vite/client" />

export interface Environment {
  apiBaseUrl: string;
  clerkPublishableKey: string;
  sentryDsn?: string;
}

declare global {
  interface Window {
    env: Environment;
  }
}
