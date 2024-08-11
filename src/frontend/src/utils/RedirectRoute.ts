import React, { useEffect } from 'react';
import { To, useNavigate, useParams, Params } from 'react-router-dom';

interface IRedirectRouteProps {
  destination: To | ((params: Params) => To);
}

// eslint-disable-next-line mobx/missing-observer
const RedirectRoute: React.FC<IRedirectRouteProps> = ({ destination }) => {
  const navigate = useNavigate();
  const params = useParams();

  useEffect((): void => {
    navigate(destination instanceof Function ? destination(params) : destination);
  }, [navigate, destination, params]);

  return null;
};

export const redirect = (destination: IRedirectRouteProps['destination']) =>
  React.createElement(RedirectRoute, { destination });

export default redirect;
