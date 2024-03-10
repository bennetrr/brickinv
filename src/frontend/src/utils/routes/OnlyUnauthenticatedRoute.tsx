import React, { ReactElement } from 'react';
import { useAppStore } from '../../domain';
import redirect from './RedirectRoute';

interface IOnlyUnauthenticatedRouteProps {
  element: ReactElement;
}

const OnlyUnauthenticatedRoute: React.FC<IOnlyUnauthenticatedRouteProps> = ({ element }) => {
  const { authenticationStore } = useAppStore();

  if (authenticationStore.isAuthenticated) {
    return redirect('/');
  }

  return element;
};

const onlyUnauthenticated = (element: ReactElement) => <OnlyUnauthenticatedRoute element={element}/>;

export default onlyUnauthenticated;
