import React from 'react';
import IDefaultPageTemplateProps from './IDefaultPageTemplateProps';
import { Outlet } from 'react-router-dom';
import { StackLayout } from '@wemogy/reactbase';

import { MainNavBar } from '../../organisms';

const DefaultPageTemplate: React.FC<IDefaultPageTemplateProps> = ({}) => {
  return (
      <StackLayout>
        <MainNavBar/>
        <Outlet/>
      </StackLayout>
  );
};

export default DefaultPageTemplate;
