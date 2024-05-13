import React, { useEffect } from 'react';
import { To, useNavigate } from 'react-router-dom';

interface IRedirectRouteProps {
  destination: To;
}

const RedirectRoute: React.FC<IRedirectRouteProps> = ({ destination }) => {
  const navigate = useNavigate();

  useEffect((): void => {
    navigate(destination);
  }, [navigate, destination]);

  return null;
};

export const redirect = (destination: string) => React.createElement(RedirectRoute, { destination });

export default redirect;
