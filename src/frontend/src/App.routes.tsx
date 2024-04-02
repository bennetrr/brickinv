import { RouteObject } from 'react-router-dom';
import {
  AcceptGroupInvitePage,
  DefaultPageTemplate,
  EmailConfirmationPage,
  ErrorPage,
  ForgotPasswordPage,
  GroupDetailPage,
  GroupOverviewPage,
  PartOverviewPage,
  PasswordResetPage,
  SetDetailPage,
  SetOverviewPage,
  SettingsPage,
  SetupPage,
  SignInPage,
  SignUpPage
} from './ui';
import { onlyUnauthenticated, protect, redirect } from './utils';

const appRoutes: RouteObject[] = [
  {
    errorElement: <ErrorPage/>,
    children: [
      { path: '/sign-in', element: onlyUnauthenticated(<SignInPage/>) },
      { path: '/sign-up', element: onlyUnauthenticated(<SignUpPage/>) },
      { path: '/confirm-email', element: <EmailConfirmationPage/> },
      { path: '/forgot-password', element: <ForgotPasswordPage/> },
      { path: '/reset-password', element: <PasswordResetPage/> },
      { path: '/invite/:inviteId/accept', element: protect(<AcceptGroupInvitePage/>) },
      {
        element: protect(<DefaultPageTemplate/>),
        children: [
          { index: true, element: redirect('/sets') },
          {
            path: '/sets',
            children: [
              { index: true, element: <SetOverviewPage/> },
              {
                path: ':setId', children: [
                  { index: true, element: <SetDetailPage/> },
                  { path: 'parts', element: <PartOverviewPage/> }
                ]
              }
            ]
          },
          {
            path: '/account',
            children: [
              { index: true, element: <SettingsPage/> },
              { path: 'setup', element: <SetupPage/> },
              {
                path: 'groups',
                children: [
                  { index: true, element: <GroupOverviewPage/> },
                  { path: ':groupId', element: <GroupDetailPage/> }
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
