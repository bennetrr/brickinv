import React from 'react';
import { Link } from 'react-router-dom';
import { Icon, StackLayout, Text } from '../../../../atoms';
import IMainNavBarProps from './IMainNavBarProps';
import { observer } from 'mobx-react';
import { useAppStore } from '../../../../../domain';
import { styled } from '@wemogy/reactbase';

const Image = styled.img`
  width: 32px;
  height: 32px;
  object-fit: cover;
  border-radius: 50%;
`;

const MainNavBar: React.FC<IMainNavBarProps> = ({}) => {
  const { userProfileStore } = useAppStore();
  console.log(userProfileStore.currentUserProfile?.profileImageUri)

  return (
    <StackLayout
      height={6}
      orientation="horizontal"
      vCenter
      paddingRightLeft={2}
      gap={2}
      backgroundColor="greyDark"
    >
      <Link to="/sets" style={{ display: 'contents' }}>
        <img
          src="/brickinv.png"
          alt="BrickInv Logo"
          style={{ height: '32px', width: 'auto' }}
        />
        <Text variation20WhiteSemi>
          BrickInv
        </Text>
      </Link>

      <StackLayout stretch/>

      <Link to="/settings">
        { userProfileStore.currentUserProfile?.profileImageUri ?
          <Image src={userProfileStore.currentUserProfile.profileImageUri} alt="Profile Image"/> :
          <Icon icon="user" variation3GreyLight/>
        }
      </Link>
    </StackLayout>
  );
};

export default observer(MainNavBar);
