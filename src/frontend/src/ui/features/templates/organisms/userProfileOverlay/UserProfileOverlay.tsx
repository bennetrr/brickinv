import IUserProfileOverlayProps from './IUserProfileOverlayProps.ts';
import React, { useCallback } from 'react';
import { observer } from 'mobx-react';
// import { Text, Button, StackLayout, Icon } from '../../../../atoms';
// import authenticationService from '../../../../../domain/authentication/AuthenticationService.ts';
// import { useNavigate } from 'react-router-dom';
// import { useAppStore } from '../../../../../domain';
// import { styled } from '@wemogy/reactbase';

// const Image = styled.img`
//   width: 32px;
//   height: 32px;
//   object-fit: cover;
//   border-radius: 50%;
// `;

const UserProfileOverlay: React.FC<IUserProfileOverlayProps> = ({ topDistance, setIsVisible, isVisible }) => {
  // const navigate = useNavigate();
  // const { userProfileStore } = useAppStore();
  //
  // const handleSignOutClick = useCallback(() => {
  //   authenticationService.signOut();
  //   setIsVisible(false);
  //   navigate('/');
  // }, [navigate, setIsVisible]);
  //
  // const handleSettingsClick = useCallback(() => {
  //   setIsVisible(false);
  //   navigate('/account/');
  // }, [navigate, setIsVisible]);
  //
  // if (!isVisible) {
  //   return null;
  // }
  //
  // return (
  //   <>
  //     <StackLayout
  //       onPress={() => setIsVisible(false)}
  //       height={{ custom: `calc(100dvh - ${topDistance*8}px)` }}
  //       positionAbsoluteFill
  //       top={topDistance}
  //       zIndex={10}
  //       backgroundColor={{ custom: 'rgba(0, 0, 0, .7)' }}
  //     />
  //
  //     <StackLayout
  //       width={35}
  //       position="absolute"
  //       top={0}
  //       right={0}
  //       zIndex={11}
  //       backgroundColor="white"
  //     >
  //       <StackLayout
  //         height={topDistance}
  //         orientation="horizontal"
  //         vCenter
  //         paddingRightLeft={2}
  //         backgroundColor="grey800"
  //       >
  //         <Text variation20WhiteSemi>{userProfileStore.currentUserProfile?.username || ''}</Text>
  //         <StackLayout stretch/>
  //
  //         { userProfileStore.currentUserProfile?.profileImageUri ?
  //           <Image src={userProfileStore.currentUserProfile.profileImageUri} alt="Profile Image"/> :
  //           <Icon icon="user" variation3Gray300/>
  //         }
  //       </StackLayout>
  //
  //       <StackLayout padding={2} gap={2}>
  //         <Button onPress={handleSettingsClick}>Settings</Button>
  //         <Button onPress={handleSignOutClick}>Sign out</Button>
  //       </StackLayout>
  //     </StackLayout>
  //   </>
  // )
  return (
    <span>Not available</span>
  )
}

export default observer(UserProfileOverlay);
