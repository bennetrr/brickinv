import React, { ReactElement, useEffect } from 'react';
import { RouteObject, useNavigate } from 'react-router-dom';

import { DefaultPageTemplate, LoginPage, RegisterPage, SetOverviewPage } from '$/ui';
import { useAppStore } from '$/domain/hooks';

const ProtectedRoute: React.FC<{ element: ReactElement }> = ({ element }) => {
  const { authenticationStore } = useAppStore();

  if (!authenticationStore.authSession.isAuthenticated) {
    return redirect('/login');
  }

  return element;
};

const protect = (element: ReactElement) => <ProtectedRoute element={element}/>;

const RedirectingRoute: React.FC<{ destination: any }> = ({ destination }) => {
  const navigate = useNavigate();

  useEffect((): void => {
    navigate(destination);
  }, [navigate, destination]);

  return null;
};

export const redirect = (route: string) => <RedirectingRoute destination={route}/>;

const appRoutes: RouteObject[] = [
  {
    path: '/login',
    element: <LoginPage/>
  },
  {
    path: '/register',
    element: <RegisterPage/>
  },
  {
    element: protect(<DefaultPageTemplate/>),
    children: [
      {
        index: true,
        element: <SetOverviewPage/>
      }
    ]
  }
];

export default appRoutes;
