import React from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';
import { Menubar } from 'primereact/menubar';
import { MenuItem } from 'primereact/menuitem';
import { Image } from 'primereact/image';
import { OrganizationSwitcher, UserButton } from '@clerk/clerk-react';

const menuItems: MenuItem[] = [
  {
    label: 'Sets',
    icon: 'pi pi-box',
    url: '/sets'
  }
];

// The observer function will break the Menubar component
// eslint-disable-next-line mobx/missing-observer
const MenuStartContent: React.FC = () => {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center'
    }}>
      <Link to="/" style={{
        display: 'flex',
        alignItems: 'center',
        gap: 4,
        color: 'inherit',
        textDecoration: 'none'
      }}>
        <Image src="/brickinv.png" alt="" height="21px" />
        <h1 style={{ fontSize: 16 }}>BrickInv</h1>
      </Link>
    </div>
  );
};

// eslint-disable-next-line mobx/missing-observer
const MenuEndContent: React.FC = () => {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 4
    }}>
      <OrganizationSwitcher organizationProfileMode="modal" />
      <UserButton userProfileMode="modal" />
    </div>
  );
};

const MainNavigation: React.FC = observer(() => {
  return (
    <Menubar model={menuItems} start={MenuStartContent} end={MenuEndContent} />
  );
});

export default MainNavigation;
