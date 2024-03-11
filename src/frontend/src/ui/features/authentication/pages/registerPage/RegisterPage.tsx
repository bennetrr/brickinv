import React, { useCallback, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthenticationService } from '../../../../../domain';
import { Button, Icon, LabeledView, StackLayout, Text, TextInput, toast } from '../../../../atoms';
import IRegisterPageProps from './IRegisterPageProps';

const RegisterPage: React.FC<IRegisterPageProps> = ({}) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUpClick = useCallback(async () => {
    if (!email && !password) {
      return;
    }

    setIsLoading(true);
    const status = await AuthenticationService.register(email, password);

    if (status === 'success') {
      toast.success('Account created');
      navigate('/login');
    } else if (status === 'error') {
      toast.error('Login failed: Unexpected error. Please try again later!');
    } else {
      status.forEach(toast.error);
    }

    setIsLoading(false);
  }, [email, password, navigate]);

  const handleEnterPress = useCallback(async (key: string) => {
    if (key !== 'Enter') {
      return;
    }

    await handleSignUpClick();
  }, [handleSignUpClick]);

  return (
    <StackLayout height100 width100 hCenter vCenter>
      <StackLayout width={40} gap>
        <LabeledView label="Email Address">
          <TextInput
            icon="envelopeOpen"
            autoFocus
            value={email}
            onChange={setEmail}
            onKeyPress={handleEnterPress}
            automationId="register-email-field"
          />
        </LabeledView>

        {/*<LabeledView label="Your name">
            <TextInput
                icon="user"
                value={username}
                onChange={setUsername}
                onKeyPress={handleEnterPress}
                automationId="register-username-field"
            />
          </LabeledView>*/}

        <LabeledView label="Password">
          <TextInput
            icon="key"
            textContentType="password"
            value={password}
            onChange={setPassword}
            onKeyPress={handleEnterPress}
            automationId="register-password-field"
          />
        </LabeledView>

        <Button
          primary14
          onPress={handleSignUpClick}
          automationId="register-signup-button"
          isLoading={isLoading}
        >
          Sign up
        </Button>

        <Link to={'/login'}>
          <StackLayout vCenter orientation="horizontal">
            <Text cta>Already have an account?</Text>
            <Icon chevronRight variation2PrimaryDark/>
          </StackLayout>
        </Link>
      </StackLayout>
    </StackLayout>
  );
};

export default RegisterPage;
