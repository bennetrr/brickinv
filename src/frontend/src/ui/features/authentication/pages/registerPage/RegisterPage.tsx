import React, { useCallback, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Icon, LabeledView, StackLayout, Text, TextInput, toast } from '$/ui';
import IRegisterPageProps from './IRegisterPageProps';
import { AuthenticationService } from '$/domain';

const RegisterPage: React.FC<IRegisterPageProps> = ({}) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  // const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUpClick = useCallback(async () => {
    const status = await AuthenticationService.register(email, password);
    
    if (status === 'success') {
      toast.success('Account created');
      navigate('/login');
      return;
    }
    
    if (status === 'error') {
      toast.error('Login failed: Unexpected error. Please try again later!');
      return;
    }

    status.forEach(toast.error);
  }, [email, /*username,*/ password, navigate]);

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
