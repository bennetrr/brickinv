import { ReactElement, useEffect } from 'react';
import { RouteObject, useNavigate } from 'react-router-dom';

import { DefaultPageTemplate, SetOverviewPage } from './ui';

const protect = (element: ReactElement) => <>Protected{element}</>;

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
    element: <DefaultPageTemplate/>,
    children: [
      {
        index: true,
        element: <SetOverviewPage/>
      }
    ]
  }
];

export default appRoutes;
