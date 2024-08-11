import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { PrimeReactProvider } from 'primereact/api';
import { ClerkProvider } from '@clerk/clerk-react';
import { Provider as MobxProvider } from 'mobx-react';
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
