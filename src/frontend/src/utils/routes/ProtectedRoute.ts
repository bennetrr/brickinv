import React, { ReactElement, useState } from 'react';
import { NotFoundError, useAppStore } from '../../domain';
import { useLocation, useNavigate } from 'react-router-dom';
import { ISignInPageNavigationState } from '../../ui/';
import { toast } from '../../ui';
import useAsyncEffect from '../UseAsyncEffect';

interface IProtectedRouteProps {
  element: ReactElement;
}

const ProtectedRoute: React.FC<IProtectedRouteProps> = ({ element }) => {
  const { authenticationStore, userProfileStore } = useAppStore();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [showPage, setShowPage] = useState(false);

  useAsyncEffect(async () => {
    if (!authenticationStore.isAuthenticated) {
      navigate('/sign-in', { state: { redirectPath: pathname } } satisfies { state: ISignInPageNavigationState });
      return;
    }

    if (pathname !== '/account/setup') {
      try {
        await userProfileStore.queryCurrentUserProfile();
      } catch (e) {
        if (e instanceof NotFoundError) {
          navigate('/account/setup');
          console.log('A');
          return;
        }

        toast.error('An unexpected server problem');
        return;
      }
    }

    setShowPage(true);
  }, [pathname]);

  return showPage ? element : null;
};

const protect = (element: ReactElement) => React.createElement(ProtectedRoute, { element });

export default protect;
