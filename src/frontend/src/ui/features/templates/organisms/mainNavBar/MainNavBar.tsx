import React from 'react';
import { Link } from 'react-router-dom';
import { Icon, StackLayout, Text } from '$/ui/atoms';
import IMainNavBarProps from './IMainNavBarProps';

const MainNavBar: React.FC<IMainNavBarProps> = ({}) => {
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

        <Link to={'/settings'}>
          <Icon icon="user" variation3GreyLight/>
        </Link>
      </StackLayout>
  );
};

export default MainNavBar;
