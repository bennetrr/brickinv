import React, { useEffect } from 'react';
import IEmailConfirmationPageProps from './IEmailConfirmationPageProps';
import { observer } from 'mobx-react';
import { LoadingIndicator, StackLayout, Text } from '../../../../atoms';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AuthenticationService } from '../../../../../domain/';
import ISignInPageNavigationState from '../signInPage/ISignInPageNavigationState.ts';

const EmailConfirmationPage: React.FC<IEmailConfirmationPageProps> = ({}) => {
  const navigate = useNavigate();
  const [searchParams, _] = useSearchParams();

  const userId = searchParams.get('userId');
  const code = searchParams.get('code');

  useEffect(() => {
    (async () => {
      const state = await (async (): Promise<ISignInPageNavigationState> => {
        if (!userId || !code) {
          return {
            message: {
              type: 'error',
              text: 'Invalid confirmation link. Please use the link from the email.'
            }
          };
        }

        try {
          await AuthenticationService.confirmEmail(userId, code);
        } catch (exc) {
          return {
            message: {
              type: 'error',
              text: 'Email confirmation failed: Unexpected error. Please try again later.'
            }
          };
        }

        return {
          message: {
            type: 'success',
            text: 'Email confirmation successful. You can now sign in.'
          }
        };
      })();

      navigate('/sign-in', { state } satisfies { state: ISignInPageNavigationState });
    })();
  }, []);

  return (
    <StackLayout height100 hCenter vCenter gap>
      <Text variation16Gray900Medium>
        Thanks for confirming your email
      </Text>

      <LoadingIndicator primary/>
    </StackLayout>
  );
};

export default observer(EmailConfirmationPage);
