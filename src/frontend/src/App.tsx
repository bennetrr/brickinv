import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AppStore, AuthenticationService, setupAxiosInstance } from './domain';
import appRoutes from './App.routes.tsx';

setupAxiosInstance(window.env.apiBaseUrl);
void AuthenticationService.initialize();

const appRouter = createBrowserRouter(appRoutes);
const appStore = AppStore.create();

AuthenticationService.registerTokenChangeHandler(token => appStore.authenticationStore.setIsAuthenticated(!!token));
appStore.authenticationStore.setIsAuthenticated(AuthenticationService.isAuthenticated);

const App: React.FC = () => {
  useEffect(() => {
    if (!AuthenticationService.isAuthenticated) {
      return;
    }

    void appStore.setStore.querySets();
  }, [appStore.authenticationStore.isAuthenticated]);

  return <RouterProvider router={appRouter} />;
};

export default observer(App);
