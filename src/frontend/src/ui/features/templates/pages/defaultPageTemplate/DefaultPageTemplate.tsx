import React from 'react';
import { Outlet } from 'react-router-dom';
import { StackLayout } from '@wemogy/reactbase';
import { MainNavBar } from '$/ui/features/templates/organisms';
import IDefaultPageTemplateProps from './IDefaultPageTemplateProps';

const DefaultPageTemplate: React.FC<IDefaultPageTemplateProps> = ({}) => {
  return (
      <StackLayout>
        <MainNavBar/>
        <Outlet/>
      </StackLayout>
  );
};

export default DefaultPageTemplate;
