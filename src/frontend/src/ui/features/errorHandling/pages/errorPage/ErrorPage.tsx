import React from 'react';
import { ErrorResponse, isRouteErrorResponse, useRouteError } from 'react-router-dom';
import { observer } from 'mobx-react';
import IErrorPageProps from './IErrorPageProps';
import NotFoundError from '../../organisms/notFoundError/NotFoundError';
import UnexpectedError from '../../organisms/unexpectedError/UnexpectedError';

const ErrorPage: React.FC<IErrorPageProps> = () => {
  const error = useRouteError();

  let ErrorNode: React.FC;

  if (error === 404) {
    ErrorNode = NotFoundError;
  } else if (!isRouteErrorResponse(error)) {
    ErrorNode = UnexpectedError;
  } else {
    switch ((error as ErrorResponse).status) {
      case 404:
        ErrorNode = NotFoundError;
        break;
      default:
        ErrorNode = UnexpectedError;
        break;
    }
  }

  return (
    <ErrorNode/>
  );
};

export default observer(ErrorPage);
