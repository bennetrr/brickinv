import { Provider } from 'mobx-react';
import { ReactBaseProvider, Toaster } from '@wemogy/reactbase';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { DefaultTheme, themeDeclaration } from './ui';
import appRoutes from './App.routes.tsx';

const appRouter = createBrowserRouter(appRoutes);

function App() {
  return (
      <Provider>
        <ReactBaseProvider
            theme={DefaultTheme}
            themeDependencies={{
              useThemeModeHook: () => 'default',
              themeDeclaration
            }}
        >
          <RouterProvider router={appRouter}/>
          <Toaster closeButton richColors position="top-right" style={{ top: 76, right: 16 }}/>
        </ReactBaseProvider>
      </Provider>
  );
}

export default App;
