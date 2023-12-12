import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

import 'the-new-css-reset/css/reset.css';
import './main.css';
import '@fontsource/inter';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <App/>
    </React.StrictMode>
);