import React, { useCallback, useState } from 'react';
import ILoginPageProps from './ILoginPageProps';
import { StackLayout, Button, LabeledView, TextInput } from '$/ui';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC<ILoginPageProps> = ({}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const navigate = useNavigate();

  const handleSignInClick = useCallback(() => {
    console.log('Sign in clicked');
  }, []);

  const handleEnterPress = useCallback((key: string) => {
    if (key !== 'enter') {
      return;
    }
    
    handleSignInClick();
  }, [handleSignInClick]);
  
  return (
      <StackLayout height100 width100 hCenter vCenter>
        <StackLayout width={40} gap>
          <LabeledView label="Email Address" >
            <TextInput
                icon="user"
                iconPosition="left"
                autoFocus
                value={email}
                onChange={setEmail}
                onKeyPress={handleEnterPress}
                automationId="login-email-field"
            />
          </LabeledView>

          <LabeledView label="Password" >
            <TextInput
                icon="key"
                iconPosition="left"
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
          
          <StackLayout width100 gap orientation="horizontal">
            <Button
                secondary14
                width={{custom: '50%'}}
                onPress={() => navigate('/register')}
                automationId="login-register-button"
            >
              Register
            </Button>
            
            <Button
                secondary14
                width={{custom: '50%'}}
                onPress={() => navigate('/reset-password')}
                automationId="login-reset-button"
            >
              Reset password
            </Button>
          </StackLayout>
        </StackLayout>
      </StackLayout>
  );
}

export default LoginPage;
