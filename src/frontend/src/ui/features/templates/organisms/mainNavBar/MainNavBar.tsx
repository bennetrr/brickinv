import React, { /*useState*/ } from 'react';
// import { Link } from 'react-router-dom';
// import { Icon, StackLayout, Text } from '../../../../atoms';
import IMainNavBarProps from './IMainNavBarProps';
import { observer } from 'mobx-react';
// import { useAppStore } from '../../../../../domain';
// import { styled } from '@wemogy/reactbase';
// import { UserProfileOverlay } from '../userProfileOverlay';

// const Image = styled.img`
//   width: 32px;
//   height: 32px;
//   object-fit: cover;
//   border-radius: 50%;
// `;

const MainNavBar: React.FC<IMainNavBarProps> = ({}) => {
  // const { userProfileStore } = useAppStore();
  // const [isUserProfileOverlayVisible, setIsUserProfileOverlayVisible] = useState(false);
  //
  // return (
  //   <>
  //     <StackLayout
  //       height={6}
  //       orientation="horizontal"
  //       vCenter
  //       paddingRightLeft={2}
  //       gap={2}
  //       backgroundColor="grey800"
  //     >
  //       <Link to="/sets" style={{ display: 'contents' }}>
  //         <Image src="/brickinv.png" alt="BrickInv Logo"/>
  //
  //         <Text variation20WhiteSemi>
  //           BrickInv
  //         </Text>
  //       </Link>
  //
  //       <StackLayout stretch/>
  //
  //       <button
  //         onClick={() => setIsUserProfileOverlayVisible(true)}
  //         data-automation-id="main-navbar-button-user-profile-overlay"
  //         style={{ display: 'contents', cursor: 'pointer' }}
  //       >
  //         { userProfileStore.currentUserProfile?.profileImageUri ?
  //           <Image src={userProfileStore.currentUserProfile.profileImageUri} alt="Profile Image"/> :
  //           <Icon icon="user" variation3Gray300/>
  //         }
  //       </button>
  //     </StackLayout>
  //
  //     <UserProfileOverlay
  //       topDistance={6}
  //       isVisible={isUserProfileOverlayVisible}
  //       setIsVisible={setIsUserProfileOverlayVisible}
  //     />
  //   </>
  // );
  return (
    <span>Not available</span>
  )
};

export default observer(MainNavBar);
