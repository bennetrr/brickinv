import React, { useRef } from 'react';
import { observer } from 'mobx-react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useClerk } from '@clerk/clerk-react';
import { Toast } from 'primereact/toast';
import { ApiServiceFactory, useAppStore } from './domain';
import { ToastProvider, useAsyncEffect } from './utils';
import appRoutes from './App.routes.tsx';

const appRouter = createBrowserRouter(appRoutes);

const App: React.FC = observer(() => {
  const clerk = useClerk();
  const { setStore } = useAppStore();

  const toast = useRef<Toast>(null);

  useAsyncEffect(async () => {
    const token = await clerk.session?.getToken();

    ApiServiceFactory.axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;

    if (token) {
      await setStore.querySets();
    }
  }, [clerk.session]);

  return (
    <>
      <ToastProvider value={toast.current}>
        <RouterProvider router={appRouter} />
      </ToastProvider>
      <Toast ref={toast}/>
    </>
  );
});

export default App;
