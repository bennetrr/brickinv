import React from 'react';
import { Outlet, RouteObject } from 'react-router-dom';
import { SignIn, SignUp } from '@clerk/clerk-react';
import ErrorPage from './ui/features/errorHandling/pages/errorPage/ErrorPage';
import DefaultPageTemplate from './ui/features/templates/pages/defaultPageTemplate/DefaultPageTemplate';
import { redirect } from './utils';

// const appRoutes: RouteObject[] = [
//   {
//     errorElement: <ErrorPage/>,
//     children: [
//       { path: '/sign-in', element: onlyUnauthenticated(<SignInPage/>) },
//       { path: '/sign-up', element: onlyUnauthenticated(<SignUpPage/>) },
//       { path: '/confirm-email', element: <EmailConfirmationPage/> },
//       { path: '/forgot-password', element: <ForgotPasswordPage/> },
//       { path: '/reset-password', element: <PasswordResetPage/> },
//       { path: '/invite/:inviteId/accept', element: protect(<AcceptGroupInvitePage/>) },
//       { path: '/account/setup', element: protect(<SetupPage/>) },
//       {
//         element: protect(<DefaultPageTemplate/>),
//         children: [
//           { index: true, element: redirect('/sets') },
//           {
//             path: '/sets',
//             children: [
//               { index: true, element: <SetOverviewPage/> },
//               {
//                 path: ':setId', children: [
//                   { index: true, element: <SetDetailPage/> },
//                   { path: 'parts', element: <PartOverviewPage/> }
//                 ]
//               }
//             ]
//           },
//           {
//             path: '/account',
//             children: [
//               { index: true, element: <SettingsPage/> },
//               {
//                 path: 'groups',
//                 children: [
//                   { index: true, element: <GroupOverviewPage/> },
//                   { path: ':groupId', element: <GroupDetailPage/> }
//                 ]
//               }
//             ]
//           }
//         ]
//       }
//     ]
//   }
// ];

const appRoutes: RouteObject[] = [
  {
    errorElement: <ErrorPage/>,
    children: [
      {
        element: <div style={{ height: '100dvh', width: '100dvw', display: 'grid', placeItems: 'center' }}><Outlet/></div>,
        children: [
          { path: '/sign-in/*', element: <SignIn path="/sign-in" signUpUrl="/sign-up"/> },
          { path: '/sign-up/*', element: <SignUp path="/sign-up" signInUrl="/sign-in"/> },
        ]
      },
      {
        path: '/',
        element: <DefaultPageTemplate/>,
        children: [
          { index: true, element: redirect('/sets') },
          {
            path: 'sets',
            element: <span>Sets</span>
          }
        ]
      }
    ]
  }
]

export default appRoutes;
