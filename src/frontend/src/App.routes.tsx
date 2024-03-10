import { RouteObject } from 'react-router-dom';
import {
  DefaultPageTemplate,
  EmailConfirmationPage,
  ErrorPage,
  ForgotPasswordPage,
  GroupDetailPage,
  GroupOverviewPage,
  LoginPage,
  PartOverviewPage,
  PasswordResetPage,
  RegisterPage,
  SetDetailPage,
  SetOverviewPage, SettingsPage
} from './ui';
import { onlyUnauthenticated, protect, redirect } from './utils';

const appRoutes: RouteObject[] = [
  {
    errorElement: <ErrorPage/>,
    children: [
      { path: '/login', element: onlyUnauthenticated(<LoginPage/>) },
      { path: '/register', element: onlyUnauthenticated(<RegisterPage/>) },
      { path: '/confirm-email', element: <EmailConfirmationPage/> },
      { path: '/forgot-password', element: <ForgotPasswordPage/> },
      { path: '/reset-password', element: <PasswordResetPage/> },
      { path: '/invite/:inviteId/accept', element: protect(<PasswordResetPage/>) },
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
