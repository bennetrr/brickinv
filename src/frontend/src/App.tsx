import { Provider as MobxProvider } from 'mobx-react';
import { ReactBaseProvider, Toaster } from '@wemogy/reactbase';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { DefaultTheme, themeDeclaration } from './ui';
import appRoutes from './App.routes.tsx';
import { AppStore } from '$/domain/stores';

const appRouter = createBrowserRouter(appRoutes);
const appStore = AppStore.create();

function App() {
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
