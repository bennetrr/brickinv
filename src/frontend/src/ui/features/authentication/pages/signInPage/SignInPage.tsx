import React, { useCallback, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthenticationService, UnauthorizedError } from '../../../../../domain';
import { Button, Icon, LabeledView, StackLayout, Text, TextInput, toast } from '../../../../atoms';
import ISignInPageProps from './ISignInPageProps.ts';
import ISignInPageNavigationState from './ISignInPageNavigationState.ts';
import _ from 'lodash';

const SignInPage: React.FC<ISignInPageProps> = ({}) => {
  const navigate = useNavigate();
  const navigationState = useLocation().state as ISignInPageNavigationState | null;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!navigationState || !navigationState.message) {
      return;
    }

    const { type, text } = navigationState.message;

    switch (type) {
      case 'error':
        toast.error(text);
        break;
      case 'info':
        toast.information(text);
        break;
      case 'success':
        toast.success(text);
        break;
    }
  }, []);

  const handleSignInClick = useCallback(async () => {
    if (_.isEmpty(email) || _.isEmpty(password)) {
      return;
    }

    setIsLoading(true);
    try {
      await AuthenticationService.signIn(email, password);
    } catch (exc) {
      if (exc instanceof UnauthorizedError) {
        toast.error('Email address or password are incorrect.');
        return;
      }

      toast.error('Login failed: Unexpected error. Please try again later.');
    } finally {
      setIsLoading(false);
    }

    navigate(navigationState?.redirectPath || '/');
  }, [email, password, navigate]);

  const handleEnterPress = useCallback(async (key: string) => {
    if (key !== 'Enter') {
      return;
    }

    await handleSignInClick();
  }, [handleSignInClick]);

  return (
    <StackLayout height100 hCenter vCenter>
      <StackLayout width={40} gap>
        <LabeledView label="Email Address">
          <TextInput
            icon="envelopeOpen"
            autoFocus
            value={email}
            onChange={setEmail}
            onKeyPress={handleEnterPress}
            automationId="login-email-field"
          />
        </LabeledView>

        <LabeledView label="Password">
          <TextInput
            icon="key"
            textContentType="password"
            value={password}
            onChange={setPassword}
            onKeyPress={handleEnterPress}
            automationId="login-password-field"
          />
        </LabeledView>

        <Button
          primary14
          onPress={handleSignInClick}
          automationId="login-signin-button"
          isLoading={isLoading}
        >
          Sign in
        </Button>

        <Link to={'/sign-up'}>
          <StackLayout vCenter orientation="horizontal">
            <Text cta>No account yet? Sign up now</Text>
            <Icon chevronRight variation2PrimaryDark/>
          </StackLayout>
        </Link>

        <Link to={'/reset-password'}>
          <StackLayout vCenter orientation="horizontal">
            <Text cta>Forgot your password?</Text>
            <Icon chevronRight variation2PrimaryDark/>
          </StackLayout>
        </Link>
      </StackLayout>
    </StackLayout>
  );
};

export default SignInPage;
