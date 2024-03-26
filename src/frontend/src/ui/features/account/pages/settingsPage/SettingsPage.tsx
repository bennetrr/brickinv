import React from 'react';
import ISettingsPageProps from './ISettingsPageProps';
import { observer } from 'mobx-react';

const SettingsPage: React.FC<ISettingsPageProps> = ({}) => {
  return <div>Settings</div>;
};

export default observer(SettingsPage);
