import React from 'react';
import { Outlet } from 'react-router-dom';
import { observer } from 'mobx-react';
import { Protect, RedirectToSignIn } from '@clerk/clerk-react';
import MainNavigation from './organisms/MainNavigation';

const MainPageTemplate: React.FC = observer(() => {
  return (
    <Protect fallback={<RedirectToSignIn />}>
      <div className="h-full flex flex-col">
        <MainNavigation />
        <div className="h-full">
          <Outlet />
        </div>
      </div>
    </Protect>
  );
});

export default MainPageTemplate;
