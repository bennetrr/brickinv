import React from 'react';
import ISetupPageProps from './ISetupPageProps.ts';
import { observer } from 'mobx-react';

const SetupPage: React.FC<ISetupPageProps> = ({}) => {
  return <div>Account Setup</div>;
};

export default observer(SetupPage);
