import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';

import './main.css';
import { ClerkProvider } from '@clerk/clerk-react';

if (!window.env.apiBaseUrl) {
  throw new Error('Missing API base URL!');
}

if (!window.env.clerkPublishableKey) {
  throw new Error('Missing Clerk Publishable Key!');
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ClerkProvider publishableKey={window.env.clerkPublishableKey}>
      <App/>
    </ClerkProvider>
  </StrictMode>
);
