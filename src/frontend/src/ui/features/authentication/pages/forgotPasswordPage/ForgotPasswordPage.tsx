import React, { useCallback, useState } from 'react';
import IForgotPasswordPageProps from './IForgotPasswordPageProps';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import { Button, Icon, LabeledView, StackLayout, Text, TextInput, toast } from '../../../../atoms';
import { AuthenticationService } from '../../../../../domain';

const ForgotPasswordPage: React.FC<IForgotPasswordPageProps> = ({}) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);

  const handleRequestPasswordResetClick = useCallback(async () => {
    if (_.isEmpty(email)) {
      toast.error('Email address needs to be filled out.');
      return;
    }

    setIsLoading(true);
    try {
      await AuthenticationService.requestPasswordReset(email);
    } catch (exc) {
      toast.error('Unexpected error. Please try again later.');
      return;
    } finally {
      setIsLoading(false);
    }

    setIsEmailSent(true);
  }, [email]);

  const handleEnterPress = useCallback(async (key: string) => {
    if (key !== 'Enter') {
      return;
    }

    await handleRequestPasswordResetClick();
  }, [handleRequestPasswordResetClick]);

  if (isEmailSent) {
    return (
      <StackLayout height100 width100 hCenter vCenter>
        <Text variation16Gray900Medium>
          We've sent you an email. If you didn't get an email, also check your spam / junk folder.
        </Text>
      </StackLayout>
    );
  }

  return (
    <StackLayout height100 width100 hCenter vCenter>
      <StackLayout width={40} gap>
        <div style={{ height: '64px' }}/>

        <LabeledView label="Email Address">
          <TextInput
            icon="envelopeOpen"
            autoFocus
            value={email}
            onChange={setEmail}
            onKeyPress={handleEnterPress}
            automationId="forgot-password-input-email"
          />
        </LabeledView>

        <Button
          primary14
          onPress={handleRequestPasswordResetClick}
          automationId="forgot-password-button-confirm"
          isLoading={isLoading}
        >
          Send the password reset email
        </Button>

        <Link to="/sign-in">
          <StackLayout vCenter orientation="horizontal" automationId="forgot-password-link-sign-in">
            <Text cta>Already have an account? Sign in</Text>
            <Icon chevronRight variation2PrimaryDark/>
          </StackLayout>
        </Link>

        <Link to="/sign-up">
          <StackLayout vCenter orientation="horizontal" automationId="forgot-password-link-sign-up">
            <Text cta>No account yet? Sign up now</Text>
            <Icon chevronRight variation2PrimaryDark/>
          </StackLayout>
        </Link>
      </StackLayout>
    </StackLayout>
  );
};

export default observer(ForgotPasswordPage);
