import { RouteObject } from 'react-router-dom';
import { SignIn, SignUp } from '@clerk/clerk-react';
import { redirect } from './utils';
import MainPageTemplate from './ui/pages/common/MainPageTemplate';
import ClerkPageTemplate from './ui/pages/common/ClerkPageTemplate';
import ErrorPage from './ui/pages/common/ErrorPage';
import SetListPage from './ui/pages/setList/SetListPage.tsx';
import SetPageTemplate from './ui/pages/common/SetPageTemplate';
import SetOverviewPage from './ui/pages/setOverview/SetOverviewPage';
import PartListPage from './ui/pages/partList/PartListPage.tsx';

const appRoutes: RouteObject[] = [
  {
    errorElement: <ErrorPage />,
    children: [
      {
        element: <ClerkPageTemplate />,
        children: [
          { path: '/sign-in/*', element: <SignIn path="/sign-in" signUpUrl="/sign-up" /> },
          { path: '/sign-up/*', element: <SignUp path="/sign-up" signInUrl="/sign-in" /> }
        ]
      },
      {
        path: '/',
        element: <MainPageTemplate />,
        children: [
          { index: true, element: redirect('/sets') },
          {
            path: 'sets',
            children: [
              { index: true, element: <SetListPage /> },
              {
                path: ':setId',
                element: <SetPageTemplate />,
                children: [
                  { index: true, element: redirect(params => `/sets/${params.setId}/overview`) },
                  { path: 'overview', element: <SetOverviewPage /> },
                  { path: 'parts', element: <PartListPage /> }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
];

export default appRoutes;
