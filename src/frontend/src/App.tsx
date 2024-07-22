import React from 'react';
import { observer, Provider as MobxProvider } from 'mobx-react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ApiServiceFactory, AppStore } from './domain';
import appRoutes from './App.routes.tsx';
import { useClerk } from '@clerk/clerk-react';
import { useAsyncEffect } from './utils';

const appRouter = createBrowserRouter(appRoutes);
const appStore = AppStore.create();

const App: React.FC = () => {
  const clerk = useClerk();

  useAsyncEffect(async () => {
    const token = await clerk.session?.getToken()
    console.log('Setting token to', token);

    ApiServiceFactory.axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;

    if (token) {
      await appStore.setStore.querySets();
    }
  }, [clerk.session]);

  return (
    <MobxProvider
      appStore={appStore}
    >
      <RouterProvider
        router={appRouter}
      />
    </MobxProvider>
  );
};

export default observer(App);
