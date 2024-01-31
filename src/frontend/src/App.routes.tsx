import { RouteObject } from 'react-router-dom';
import {
  DefaultPageTemplate,
  ErrorPage,
  LoginPage,
  PartOverviewPage,
  RegisterPage,
  SetDetailPage,
  SetOverviewPage
} from '$/ui';
import { protect, onlyUnauthenticated, redirect } from '$/utils'

const appRoutes: RouteObject[] = [
  {
    errorElement: <ErrorPage/>,
    children: [
      {
        path: '/login',
        element: onlyUnauthenticated(<LoginPage/>)
      },
      {
        path: '/register',
        element: onlyUnauthenticated(<RegisterPage/>)
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
    ]
  }
];

export default appRoutes;
