import React from 'react';
import { Outlet } from 'react-router-dom';
import { observer } from 'mobx-react';

const ClerkPageTemplate: React.FC = observer(() => {
  return (
    <div className="w-full h-full grid place-items-center">
      <Outlet />
    </div>
  );
});

export default ClerkPageTemplate;
