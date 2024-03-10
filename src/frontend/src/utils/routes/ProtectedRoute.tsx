import React, { ReactElement } from 'react';
import { useAppStore } from '../../domain';
import redirect from './RedirectRoute';

interface IProtectedRouteProps {
  element: ReactElement;
}

const ProtectedRoute: React.FC<IProtectedRouteProps> = ({ element }) => {
  const { authenticationStore } = useAppStore();

  if (!authenticationStore.isAuthenticated) {
    return redirect('/login');
  }

  return element;
};

const protect = (element: ReactElement) => <ProtectedRoute element={element}/>;

export default protect;
