import { Provider as MobxProvider } from 'mobx-react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ReactBaseProvider, Toaster } from '@wemogy/reactbase';
import { DefaultTheme, themeDeclaration } from './ui';
import { AuthenticationService, setupAxiosInstance, AppStore } from '$/domain';
import appRoutes from './App.routes.tsx';
import { useEffect } from 'react';

setupAxiosInstance(window.env.apiBaseUrl);
AuthenticationService.initialize();

const appRouter = createBrowserRouter(appRoutes);
const appStore = AppStore.create();

AuthenticationService.addTokenChangeHandler(token => appStore.authenticationStore.setIsAuthenticated(!!token));
appStore.authenticationStore.setIsAuthenticated(AuthenticationService.isAuthenticated);

function App() {
  useEffect(() => {
    appStore.legoSetStore.queryLegoSets();
  }, [AuthenticationService.isAuthenticated]);
  
  return (
      <MobxProvider appStore={appStore}>
        <ReactBaseProvider
            theme={DefaultTheme}
            themeDependencies={{
              useThemeModeHook: () => 'default',
              themeDeclaration
            }}
        >
          <RouterProvider router={appRouter}/>
          <Toaster closeButton richColors position="top-right" style={{ top: 16, right: 16 }}/>
        </ReactBaseProvider>
      </MobxProvider>
  );
}

export default App;
