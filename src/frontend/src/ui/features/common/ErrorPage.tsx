import React from 'react';
import { observer } from 'mobx-react';
import { isRouteErrorResponse, Link, useRouteError } from 'react-router-dom';
import MainNavigation from './organisms/MainNavigation';
import { SignedIn, SignedOut } from '@clerk/clerk-react';
import { Button } from 'primereact/button';
import ErrorText from './organisms/ErrorText';

const ErrorPage: React.FC = observer(() => {
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
      errorElement = <ErrorText code="404" message="The page you are looking for does not exist." />;
      break;
    default:
      errorElement = <ErrorText code="Unexpected Error" message="Try reloading the page or wait a few minutes." />;
  }

  return (
    <div className="h-full flex flex-col">
      <SignedIn>
        <MainNavigation />
      </SignedIn>

      <div className="flex-auto grid place-items-center">
        <div className="flex flex-col items-center">
          {errorElement}

          <SignedOut>
            <Link to={"/sign-in"}>
              <Button label="Sign In" link icon="pi pi-lock-open" />
            </Link>
          </SignedOut>
        </div>
      </div>
    </div>
  );
});

export default ErrorPage;
