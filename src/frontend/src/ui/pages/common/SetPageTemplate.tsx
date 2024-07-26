import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react';
import { TabMenu } from 'primereact/tabmenu';
import { MenuItem, MenuItemCommandEvent } from 'primereact/menuitem';

const SetPageTemplate: React.FC = observer(() => {
  const { pathname } = useLocation();
  const [activeMenuIndex, setActiveMenuIndex] = useState(0);
  const navigate = useNavigate();

  const handleMenuItemClick = useCallback((event: MenuItemCommandEvent) => {
    navigate(event.item.data.url);
  }, [navigate]);

  const menuItems: MenuItem[] = useMemo(() => {
    return [
      {
        label: 'Set Overview',
        icon: 'pi pi-sliders-h',
        command: handleMenuItemClick,
        data: {
          url: 'overview'
        }
      },
      {
        label: 'Part Lists',
        icon: 'pi pi-list-check',
        command: handleMenuItemClick,
        data: {
          url: 'parts'
        }
      }
    ];
  }, [handleMenuItemClick]);

  useEffect(() => {
    const lastPathSegment = pathname.split('/').pop();

    const currentMenuItem = menuItems.find(x => x.data.url === lastPathSegment);

    if (!currentMenuItem) {
      return;
    }

    const currentIndex = menuItems.indexOf(currentMenuItem);
    setActiveMenuIndex(currentIndex);
  }, [menuItems, pathname]);

  return (
    <div className="h-full flex flex-col">
      <TabMenu model={menuItems} activeIndex={activeMenuIndex} onTabChange={e => setActiveMenuIndex(e.index)} />
      <div className="flex-auto">
        <Outlet />
      </div>
    </div>
  );
});

export default SetPageTemplate;
