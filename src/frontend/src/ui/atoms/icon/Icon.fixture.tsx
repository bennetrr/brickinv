import React from 'react';
import { useFixtureSelect } from 'react-cosmos/client';
import { IIcons } from '@wemogy/reactbase';
import Icon, { iconMapKeys } from './Icon.tsx';

interface IBaseProps {
  variationKey: string;
  _darkBg?: boolean;
}

const Base: React.FC<IBaseProps> = ({ variationKey, _darkBg }) => {
  const [icon] = useFixtureSelect<keyof IIcons>('Icon', {
    options: iconMapKeys,
    defaultValue: 'users'
  });

  const component = (
    <Icon
      variationKey={variationKey}
      icon={icon}
    />
  );

  if (!_darkBg) {
    return component;
  }

  return (
    <div style={{ backgroundColor: 'black' , padding: 16 }}>
      {component}
    </div>
  )
};

export default {
  'Size2 Primary300': <Base variationKey="variation2Primary300"/>,
  'Size2 Primary500': <Base variationKey="variation2Primary500"/>,
  'Size2 White': <Base variationKey="variation2White" _darkBg/>,
  'Size2 Gray500': <Base variationKey="variation2Gray500"/>,
  'Size2 Gray900': <Base variationKey="variation2Gray900"/>,
  'Size3 Primary500': <Base variationKey="variation3Primary500"/>,
  'Size3 Gray300': <Base variationKey="variation3Gray300"/>,
  'Size3 Gray500': <Base variationKey="variation3Gray500"/>,
  'Size3 Red500': <Base variationKey="variation3Red500"/>,
  'Size3 Green500': <Base variationKey="variation3Green500"/>,
  'Size5 White': <Base variationKey="variation5White" _darkBg/>,
  'Navigation Button': <Base variationKey="navigationButton"/>,
  'Navigation Button (Disabled)': <Base variationKey="navigationButtonDisabled" />,
};
