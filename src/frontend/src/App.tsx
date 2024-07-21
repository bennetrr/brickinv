import React from 'react';
import { observer, Provider as MobxProvider } from 'mobx-react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AppStore } from './domain';
import appRoutes from './App.routes.tsx';

const appRouter = createBrowserRouter(appRoutes);
const appStore = AppStore.create();

const App: React.FC = () => {
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
