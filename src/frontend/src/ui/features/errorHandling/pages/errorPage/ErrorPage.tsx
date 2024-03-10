import { debug } from 'debug';
import React from 'react';
import { ErrorResponse, isRouteErrorResponse, useRouteError } from 'react-router-dom';
import { observer } from 'mobx-react';
import { RenderIf } from '@wemogy/reactbase';
import { useAppStore } from '../../../../../domain';
import { StackLayout } from '../../../../atoms';
import { MainNavBar } from '../../../templates';
import { NotFoundError, UnexpectedError } from '../../organisms';
import IErrorPageProps from './IErrorPageProps';

const log = debug('App.Ui.ErrorPage');

const ErrorPage: React.FC<IErrorPageProps> = () => {
  const error = useRouteError();
  const { authenticationStore } = useAppStore();

  log('Route Error: %O', error);

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
    <StackLayout height100>
      <RenderIf condition={authenticationStore.isAuthenticated}>
        <MainNavBar/>
      </RenderIf>

      <StackLayout width100 height100 vCenter hCenter>
        <ErrorNode/>
      </StackLayout>
    </StackLayout>
  );
};

export default observer(ErrorPage);
