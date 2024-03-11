import { Link, useNavigate } from 'react-router-dom';
import React, { useCallback, useEffect, useState } from 'react';
import { AuthenticationService } from '../../../../../domain';
import { Button, Icon, LabeledView, StackLayout, Text, TextInput, toast } from '../../../../atoms';
import ILoginPageProps from './ILoginPageProps';

const LoginPage: React.FC<ILoginPageProps> = ({}) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSignInClick = useCallback(async () => {
    if (!email && !password) {
      return;
    }

    setIsLoading(true);
    const status = await AuthenticationService.login(email, password);

    switch (status) {
      case 'success':
        toast.success('Login successful');
        navigate('/');
        break;
      case 'unauthorized':
        toast.error('Email address or password are incorrect!');
        break;
      default:
        toast.error('Login failed: Unexpected error. Please try again later!');
        break;
    }

    setIsLoading(false);
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

        <Link to={'/register'}>
          <StackLayout vCenter orientation="horizontal">
            <Text cta>No account yet?</Text>
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

export default LoginPage;
