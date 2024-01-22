import React, { useEffect } from 'react';
import { observer, Provider as MobxProvider } from 'mobx-react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ReactBaseProvider, Toaster } from '@wemogy/reactbase';
import { DefaultTheme, themeDeclaration } from '$/ui';
import { AppStore, AuthenticationService, setupAxiosInstance } from '$/domain';
import appRoutes from './App.routes.tsx';

setupAxiosInstance(window.env.apiBaseUrl);
AuthenticationService.initialize();

const appRouter = createBrowserRouter(appRoutes);
const appStore = AppStore.create();

AuthenticationService.addTokenChangeHandler(token => appStore.authenticationStore.setIsAuthenticated(!!token));
appStore.authenticationStore.setIsAuthenticated(AuthenticationService.isAuthenticated);

// TODO: Backend
//       - Loosen up password requirements
//       - Error handling and logging
//       - Groups and Users
//       - Space Blocks Permissions
//       - CQRS (?)
//       - Make use of ErrorHandlerMiddleware

// TODO: Frontend
//       - Loading, success and error indicators
//       - Error handling and logging
//       - Test for and fix small errors
//       - Customize theme
//       - Move components into own files

// TODO: General
//       - Think of app name and logo
//       - Docker containers and compose file
//       - GitHub Workflows
//       - Ask Sebastian things that I don't understand
//       - Ask Sebastian for feedback on code
//       - Write documentation and tests (maybe)

const App: React.FC = () => {
  useEffect(() => {
    if (!AuthenticationService.isAuthenticated) {
      return;
    }
    
    appStore.setStore.querySets();
  }, [appStore.authenticationStore.isAuthenticated]);

  return (
      <MobxProvider
          appStore={appStore}
      >
        <ReactBaseProvider
            theme={DefaultTheme}
            themeDependencies={{
              useThemeModeHook: () => 'default',
              themeDeclaration
            }}
        >
          <RouterProvider
              router={appRouter}
          />
          
          <Toaster
              closeButton
              richColors
              position="top-right"
              style={{ top: 16, right: 16 }}
          />
        </ReactBaseProvider>
      </MobxProvider>
  );
}

export default observer(App);
