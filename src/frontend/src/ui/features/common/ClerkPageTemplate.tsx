import React from 'react';
import { Outlet } from 'react-router-dom';
import { observer } from 'mobx-react';

const ClerkPageTemplate: React.FC = observer(() => {
  return (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'grid',
      placeItems: 'center'
    }}>
      <Outlet />
    </div>
  );
});

export default ClerkPageTemplate;
