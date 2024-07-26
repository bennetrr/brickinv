import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { observer } from 'mobx-react';
import { TabMenu } from 'primereact/tabmenu';
import { MenuItem } from 'primereact/menuitem';

const menuItems: MenuItem[] = [
  {
    label: 'Set Overview',
    icon: 'pi pi-sliders-h',
    url: 'overview'
  },
  {
    label: 'Part Lists',
    icon: 'pi pi-list-check',
    url: 'parts'
  }
]

const SetPageTemplate: React.FC = observer(() => {
  const { pathname } = useLocation();
  const [activeMenuIndex, setActiveMenuIndex] = useState(0);

  useEffect(() => {
    const lastPathSegment = pathname.split('/').pop();

    const currentMenuItem = menuItems.find(x => x.url === lastPathSegment);

    if (!currentMenuItem) {
      return;
    }

    const currentIndex = menuItems.indexOf(currentMenuItem);
    setActiveMenuIndex(currentIndex);
  }, [pathname]);

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
