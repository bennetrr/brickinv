import React from 'react';
import ReactDOM from 'react-dom/client';
import { PrimeReactProvider } from 'primereact/api';
import { Provider as MobxProvider } from 'mobx-react';
import { AppStore } from './domain';
import App from './App.tsx';

import './main.css';
import 'primereact/resources/themes/lara-light-amber/theme.css';
import 'primeicons/primeicons.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <PrimeReactProvider>
      <MobxProvider appStore={AppStore.create()}>
        <App/>
      </MobxProvider>
    </PrimeReactProvider>
  </React.StrictMode>
);
