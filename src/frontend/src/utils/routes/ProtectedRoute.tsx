import React, { ReactElement } from 'react';
import { useAppStore } from '../../domain';
import { useLocation, useNavigate } from 'react-router-dom';
import { ISignInPageNavigationState } from '../../ui/';

interface IProtectedRouteProps {
  element: ReactElement;
}

const ProtectedRoute: React.FC<IProtectedRouteProps> = ({ element }) => {
  const { authenticationStore } = useAppStore();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  if (!authenticationStore.isAuthenticated) {
    navigate('/sign-in', { state: { redirectPath: pathname } } satisfies { state: ISignInPageNavigationState });
  }

  return element;
};

const protect = (element: ReactElement) => <ProtectedRoute element={element}/>;

export default protect;
