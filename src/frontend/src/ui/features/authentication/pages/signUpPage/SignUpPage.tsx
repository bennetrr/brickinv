import React, { useCallback, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthenticationService, InvalidCredentialsError } from '../../../../../domain';
import { Button, Icon, LabeledView, StackLayout, Text, TextInput, toast } from '../../../../atoms';
import ISignUpPageProps from './ISignUpPageProps.ts';
import _ from 'lodash';
import ISignInPageNavigationState from '../signInPage/ISignInPageNavigationState.ts';

const SignUpPage: React.FC<ISignUpPageProps> = ({}) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUpClick = useCallback(async () => {
    if (_.isEmpty(email) || _.isEmpty(password)) {
      toast.error('Both email address and password need to be filled out.');
      return;
    }

    setIsLoading(true);
    try {
      await AuthenticationService.signUp(email, password);
    } catch (exc) {
      if (exc instanceof InvalidCredentialsError) {
        exc.messages.forEach(x => toast.error(x.message));
        return;
      }

      toast.error('Unexpected error. Please try again later.');
    } finally {
      setIsLoading(false);
    }

    const navigationState: ISignInPageNavigationState = {
      message: {
        type: 'success',
        text: 'Account was successfully created, you can now sign in.'
      }
    }
    navigate('/sign-in', { state: navigationState });
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
            automationId="sign-up-input-email"
          />
        </LabeledView>

        <LabeledView label="Password">
          <TextInput
            icon="key"
            textContentType="password"
            value={password}
            onChange={setPassword}
            onKeyPress={handleEnterPress}
            automationId="sign-up-input-password"
          />
        </LabeledView>

        <Button
          primary14
          onPress={handleSignUpClick}
          automationId="sign-up-button-confirm"
          isLoading={isLoading}
        >
          Sign up
        </Button>

        <Link to="/sign-in">
          <StackLayout vCenter orientation="horizontal" automationId="sign-up-link-sign-in">
            <Text cta>Already have an account? Sign in</Text>
            <Icon chevronRight variation2PrimaryDark/>
          </StackLayout>
        </Link>

        <Link to="/forgot-password">
        <StackLayout vCenter orientation="horizontal" automationId="sign-up-link-forgot-password">
          <Text cta>Forgot your password?</Text>
          <Icon chevronRight variation2PrimaryDark/>
        </StackLayout>
      </Link>
      </StackLayout>
    </StackLayout>
  );
};

export default SignUpPage;
