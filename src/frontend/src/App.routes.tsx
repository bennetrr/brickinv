import React, { ReactElement, useEffect } from 'react';
import { RouteObject, useNavigate } from 'react-router-dom';
import { DefaultPageTemplate, LoginPage, PartOverviewPage, RegisterPage, SetDetailPage, SetOverviewPage } from '$/ui';
import { useAppStore } from '$/domain';

const ProtectedRoute: React.FC<{ element: ReactElement }> = ({ element }) => {
  const { authenticationStore } = useAppStore();

  if (!authenticationStore.isAuthenticated) {
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

const UnauthenticatedRoute: React.FC<{ element: ReactElement }> = ({ element }) => {
  const { authenticationStore } = useAppStore();

  if (authenticationStore.isAuthenticated) {
    return redirect('/');
  }

  return element;
};

const unauthenticated = (element: ReactElement) => <UnauthenticatedRoute element={element}/>;

const appRoutes: RouteObject[] = [
  {
    path: '/login',
    element: unauthenticated(<LoginPage/>)
  },
  {
    path: '/register',
    element: unauthenticated(<RegisterPage/>)
  },
  {
    element: protect(<DefaultPageTemplate/>),
    children: [
      {
        index: true,
        element: redirect('/sets')
      },
      {
        path: '/sets',
        children: [
          {
            index: true,
            element: <SetOverviewPage/>
          },
          {
            path: ':setId',
            children: [
              {
                index: true,
                element: <SetDetailPage/>
              },
              {
                path: 'parts',
                element: <PartOverviewPage/>
              }
            ]
          }
        ]
      }
    ]
  }
];

export default appRoutes;
