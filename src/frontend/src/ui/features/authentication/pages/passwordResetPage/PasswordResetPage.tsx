import React, { useCallback, useEffect, useState } from 'react';
import IPasswordResetPageProps from './IPasswordResetPageProps';
import { observer } from 'mobx-react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import _ from 'lodash';
import { Button, Icon, LabeledView, StackLayout, Text, TextInput, toast } from '../../../../atoms';
import { AuthenticationService } from '../../../../../domain';
import ISignInPageNavigationState from '../signInPage/ISignInPageNavigationState.ts';

const PasswordResetPage: React.FC<IPasswordResetPageProps> = ({}) => {
  const navigate = useNavigate();
  const [searchParams, __] = useSearchParams();

  const email = searchParams.get('email');
  const code = searchParams.get('code');

  const [newPassword, setNewPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!email || !code) {
      navigate('/sign-in', {
        state: {
          message: {
            type: 'error',
            text: 'Invalid password reset link. Please use the link from the email.'
          }
        }
      } satisfies { state: ISignInPageNavigationState });
    }
  }, []);

  const handlePasswordResetClick = useCallback(async () => {
    if (!email || !code) {
      navigate('/sign-in', {
        state: {
          message: {
            type: 'error',
            text: 'Invalid password reset link. Please use the link from the email.'
          }
        }
      } satisfies { state: ISignInPageNavigationState });
      return;
    }

    if (_.isEmpty(newPassword)) {
      toast.error('New password needs to be filled out.');
      return;
    }

    setIsLoading(true);
    try {
      await AuthenticationService.resetPassword(email, code, newPassword);
    } catch (exc) {
      toast.error('Unexpected error. Please try again later.');
    } finally {
      setIsLoading(false);
    }

    navigate('/sign-in', {
      state: {
        message: {
          type: 'success',
          text: 'Password reset successful. You can now sign in.'
        }
      }
    } satisfies { state: ISignInPageNavigationState });
  }, [newPassword, navigate, email, code]);

  const handleEnterPress = useCallback(async (key: string) => {
    if (key !== 'Enter') {
      return;
    }

    await handlePasswordResetClick();
  }, [handlePasswordResetClick]);

  return (
    <StackLayout height100 width100 hCenter vCenter>
      <StackLayout width={40} gap>
        <div style={{ height: '64px' }}/>

        <LabeledView label="New Password">
          <TextInput
            icon="key"
            autoFocus
            value={newPassword}
            onChange={setNewPassword}
            textContentType="password"
            onKeyPress={handleEnterPress}
            automationId="sign-up-input-email"
          />
        </LabeledView>

        <Button
          primary
          onPress={handlePasswordResetClick}
          automationId="sign-up-button-confirm"
          isLoading={isLoading}
        >
          Reset your password
        </Button>

        <Link to="/sign-in">
          <StackLayout vCenter orientation="horizontal" automationId="reset-password-link-sign-in">
            <Text variation14Primary500>Already have an account? Sign in</Text>
            <Icon chevronRight variation2Primary500/>
          </StackLayout>
        </Link>

        <Link to="/sign-up">
          <StackLayout vCenter orientation="horizontal" automationId="reset-password-link-sign-up">
            <Text variation14Primary500>No account yet? Sign up now</Text>
            <Icon chevronRight variation2Primary500/>
          </StackLayout>
        </Link>
      </StackLayout>
    </StackLayout>
  );
};

export default observer(PasswordResetPage);
