import React from 'react';
import { observer } from 'mobx-react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ApiServiceFactory, useAppStore } from './domain';
import appRoutes from './App.routes.tsx';
import { useClerk } from '@clerk/clerk-react';
import { useAsyncEffect } from './utils';

const appRouter = createBrowserRouter(appRoutes);

const App: React.FC = observer(() => {
  const clerk = useClerk();
  const { setStore } = useAppStore();

  useAsyncEffect(async () => {
    const token = await clerk.session?.getToken();

    ApiServiceFactory.axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;

    if (token) {
      await setStore.querySets();
    }
  }, [clerk.session]);

  return <RouterProvider router={appRouter} />;
});

export default App;
