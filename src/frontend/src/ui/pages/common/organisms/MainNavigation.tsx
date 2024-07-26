import React, { useCallback, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react';
import { Menubar } from 'primereact/menubar';
import { MenuItem, MenuItemCommandEvent } from 'primereact/menuitem';
import { OrganizationSwitcher, UserButton } from '@clerk/clerk-react';

// The observer function will break the Menubar component
// eslint-disable-next-line mobx/missing-observer
const MenuStartContent: React.FC = () => {
  return (
    <div className="flex items-center">
      <Link to="/" className="contents no-underline">
        <div className="h-full flex items-center gap-1 mr-1">
          <img src="/brickinv.png" alt="" height="1024" width="1024" className="h-[40px] w-auto" />
          <h1 className="text-lg text-[var(--primary-color)]">BrickInv</h1>
        </div>
      </Link>
    </div>
  );
};

// eslint-disable-next-line mobx/missing-observer
const MenuEndContent: React.FC = () => {
  return (
    <div className="flex items-center gap-1">
      <OrganizationSwitcher organizationProfileMode="modal" />
      <UserButton userProfileMode="modal" />
    </div>
  );
};

const MainNavigation: React.FC = observer(() => {
  const navigate = useNavigate();

  const handleMenuItemClick = useCallback((event: MenuItemCommandEvent) => {
    navigate(event.item.data.url);
  }, [navigate]);

  const menuItems: MenuItem[] = useMemo(() => {
    return [
      {
        label: 'Sets',
        icon: 'pi pi-box',
        command: handleMenuItemClick,
        data: {
          url: '/sets'
        }
      }
    ];
  }, [handleMenuItemClick]);

  return (
    <Menubar model={menuItems} start={MenuStartContent} end={MenuEndContent} />
  );
});

export default MainNavigation;
