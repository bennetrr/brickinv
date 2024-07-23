import { RouteObject } from 'react-router-dom';
import { SignIn, SignUp } from '@clerk/clerk-react';
import { redirect } from './utils';
import MainPageTemplate from './ui/features/common/MainPageTemplate';
import ClerkPageTemplate from './ui/features/common/ClerkPageTemplate';
import ErrorPage from './ui/features/common/ErrorPage';

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
              { index: true, element: <span>Sets</span> },
              {
                path: ':setId',
                children: [
                  { index: true, element: redirect('overview') },  // TODO: Is called twice in dev mode
                  { path: 'overview', element: <span>Set overview</span> },
                  { path: 'parts', element: <span>Parts</span> }
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
