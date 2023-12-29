import React from 'react';
import { Link } from 'react-router-dom';
import { Icon, StackLayout, Text } from '$/ui/atoms';
import IMainNavBarProps from './IMainNavBarProps';

const MainNavBar: React.FC<IMainNavBarProps> = ({}) => {
  return (
      <StackLayout padding={2} vCenter orientation="horizontal" backgroundColor="greyDark">
        <Link to="/">
          <Text variation20WhiteSemi>App</Text>
        </Link>

        <StackLayout stretch/>

        <Link to={'/settings'}>
          <Icon icon="user" variation3GreyLight/>
        </Link>
      </StackLayout>
  );
};

export default MainNavBar;
