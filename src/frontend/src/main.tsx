import { StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { createRoutesFromChildren, matchRoutes, useLocation, useNavigationType } from 'react-router-dom';
import { Provider as MobxProvider } from 'mobx-react';
import { ClerkProvider } from '@clerk/clerk-react';
import * as Sentry from '@sentry/react';
import { PrimeReactProvider } from 'primereact/api';
import { AppStore } from './domain';
import App from './App.tsx';

import './main.css';
import 'primereact/resources/themes/lara-light-amber/theme.css';
import 'primeicons/primeicons.css';

if (!window.env.apiBaseUrl) {
  throw new Error('Missing API base URL!');
}

if (!window.env.clerkPublishableKey) {
  throw new Error('Missing Clerk Publishable Key!');
}

if (window.env.sentryDsn) {
  Sentry.init({
    dsn: window.env.sentryDsn,
    integrations: [
      Sentry.reactRouterV6BrowserTracingIntegration({
        useEffect,
        useLocation,
        useNavigationType,
        createRoutesFromChildren,
        matchRoutes
      }),
      Sentry.replayIntegration()
    ],
    tracesSampleRate: 1.0,
    tracePropagationTargets: [/^https:\/\/(dev\.)?api\.brickinv\.ranft\.ing/],
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PrimeReactProvider>
      <ClerkProvider publishableKey={window.env.clerkPublishableKey}>
        <MobxProvider appStore={AppStore.create()}>
          <App />
        </MobxProvider>
      </ClerkProvider>
    </PrimeReactProvider>
  </StrictMode>
);
