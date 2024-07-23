import React from 'react';
import { observer } from 'mobx-react';
import { isRouteErrorResponse, useRouteError, useNavigate } from 'react-router-dom';
import MainNavigation from './organisms/MainNavigation';
import { SignedIn, SignedOut } from '@clerk/clerk-react';
import { Button } from 'primereact/button';
import ErrorText from './organisms/ErrorText';

const ErrorPage: React.FC = observer(() => {
  const navigate = useNavigate();
  const error = useRouteError();
  let errorCode: unknown;

  if (import.meta.env.DEV) {
    console.log('Route error:', error);
  }

  if (isRouteErrorResponse(error)) {
    errorCode = error.status;
  } else {
    errorCode = error;
  }

  let errorElement: React.ReactNode;

  switch (errorCode) {
    case 404:
      errorElement = <ErrorText code="404" message="The page you are looking for does not exist."/>;
      break;
    default:
      errorElement = <ErrorText code="Unexpected Error" message="Try reloading the page or wait a few minutes."/>;
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%'
    }}>
      <SignedIn>
        <MainNavigation />
      </SignedIn>

      <div style={{
        flex: '1 1 auto',
        display: 'grid',
        placeItems: 'center'
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
          {errorElement}

          <SignedOut>
            <Button label="Sign In" link icon="pi pi-lock-open" onClick={() => navigate('/sign-in')}/>
          </SignedOut>
        </div>
      </div>
    </div>
  )
});

export default ErrorPage;
