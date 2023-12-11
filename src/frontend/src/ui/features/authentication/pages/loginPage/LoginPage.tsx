import React, { useCallback, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios, { AxiosError } from 'axios';
import { Button, Icon, LabeledView, StackLayout, Text, TextInput, toast } from '$/ui';
import { useAppStore } from '$/domain';
import ILoginPageProps from './ILoginPageProps';

const axiosInstance = axios.create({ baseURL: 'http://localhost:5105' });

const LoginPage: React.FC<ILoginPageProps> = ({}) => {
  const navigate = useNavigate();
  const { authenticationStore } = useAppStore();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignInClick = useCallback(async () => {
    try {
      const response = await axiosInstance.post('/login', { email, password });
      authenticationStore.authSession.setSession(
          response.data.tokenType,
          response.data.accessToken,
          response.data.refreshToken,
          response.data.expiresIn
      );
    } catch (error) {
      if (!(error instanceof AxiosError) || !error.response || error.response.status !== 401) {
        toast.error('Login failed: Unexpected error. Please try again later!');
        return;
      }

      toast.error('Email address or password are incorrect!');
      return;
    }

    toast.success('Login successful');
    navigate('/');
  }, [email, password]);

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
