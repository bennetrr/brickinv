import React from 'react';
// import { Outlet } from 'react-router-dom';
// import { StackLayout } from '@wemogy/reactbase';
// import { MainNavBar } from '../../organisms';
import IDefaultPageTemplateProps from './IDefaultPageTemplateProps';
import { Outlet } from 'react-router-dom';
import { OrganizationSwitcher, UserButton } from '@clerk/clerk-react';

const DefaultPageTemplate: React.FC<IDefaultPageTemplateProps> = ({}) => {
  return (
    // <StackLayout>
    //   <MainNavBar/>
    //   <Outlet/>
    // </StackLayout>
    <div style={{
      display: 'flex',
      flexDirection: 'column'
    }}>
      <div style={{borderBottom: '1px solid black', padding: 8, display: 'flex'}}>
        Navigation
        <div style={{ flex: '1 1 auto' }}/>
        <OrganizationSwitcher/>
        <UserButton userProfileMode="modal"/>
      </div>
      <Outlet/>
    </div>
  );
};

export default DefaultPageTemplate;
