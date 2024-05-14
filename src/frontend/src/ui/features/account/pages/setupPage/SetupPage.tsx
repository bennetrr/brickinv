import React, { useCallback, useState } from 'react';
import ISetupPageProps from './ISetupPageProps.ts';
import { observer } from 'mobx-react';
import { Button, LabeledView, StackLayout, Text, TextInput, toast } from '../../../../atoms';
import { MainNavBar } from '../../../templates';
import { useAppStore, UserProfileAlreadyExistsError } from '../../../../../domain';
import { initials } from '@dicebear/collection';
import { ImageUpload } from '../../../../molecules';
import { useNavigate } from 'react-router-dom';

const SetupPage: React.FC<ISetupPageProps> = ({}) => {
  const { userProfileStore } = useAppStore();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [profileImage, setProfileImage] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateClick = useCallback(async () => {
    if (username === '') {
      toast.error('You need to enter a username!');
      return;
    }

    setIsLoading(true);

    try {
      await userProfileStore.createUserProfile(username, profileImage);
    } catch (e) {
      if (e instanceof UserProfileAlreadyExistsError) {
        toast.information('Your user profile is already created.')
        navigate('/');
        return;
      }

      toast.error('Unexpected error. Please try again later.');
      return;
    } finally {
      setIsLoading(false);
    }

    navigate('/');
  }, [username, profileImage, userProfileStore, navigate]);

  const handleEnterPress = useCallback(async (key: string) => {
    if (key !== 'Enter') {
      return;
    }

    await handleCreateClick();
  }, [handleCreateClick]);

  return (
    <StackLayout height100>
      <MainNavBar/>

      <StackLayout height100 hCenter vCenter gap={6}>
        <StackLayout width={40} gap={4}>
          <StackLayout gap>
            <Text variation30Grey900Bold lineHeight={40}>
              Hi, welcome to BrickInv!
            </Text>

            <Text variation16Gray600Medium>
              Please complete your profile to get started.
            </Text>
          </StackLayout>

          <LabeledView label="Username">
            <TextInput
              icon="user"
              autoFocus
              value={username}
              onChange={setUsername}
              onKeyPress={handleEnterPress}
              automationId="profile-setup-input-username"
            />
          </LabeledView>

          <ImageUpload
            imageDataUrl={profileImage}
            setImageDataUrl={setProfileImage}
            automationIdPrefix="profile-setup"
            dimensions={15}
            dicebearModel={initials}
            dicebearSeed={username}
          />

          <Button
            primary
            onPress={handleCreateClick}
            automationId="profile-setup-input-button-confirm"
            isLoading={isLoading}
          >
            Complete profile
          </Button>
        </StackLayout>
      </StackLayout>
    </StackLayout>
  );
};

export default observer(SetupPage);
