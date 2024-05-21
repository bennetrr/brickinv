import React, { PropsWithChildren, useCallback } from 'react';
import { useFixtureInput, useFixtureSelect } from 'react-cosmos/client';
import { IIcons } from '@wemogy/reactbase';
import { iconMapKeys } from '../icon/Icon.tsx';
import IconButton from './IconButtonComponent.tsx';
import { toast } from '../toaster';

interface IBaseProps extends PropsWithChildren {
  variationKey: string;
}

const Base: React.FC<IBaseProps> = ({ variationKey }) => {
  const handlePress = useCallback(() => {
    toast.information('Pressed button');
  }, []);

  const [icon] = useFixtureSelect<keyof IIcons>('Icon', {
    options: iconMapKeys,
    defaultValue: 'users'
  });
  const [isLoading] = useFixtureInput('Loading', false);
  const [disabled] = useFixtureInput('Disabled', false);

  return <IconButton
    onPress={handlePress}
    variationKey={variationKey + (disabled && 'Disabled' || '')}
    icon={icon}
    isLoading={isLoading}
    disabled={disabled}
  />;
};

export default {
  'Primary': <Base variationKey="primary"/>,
  'Secondary': <Base variationKey="secondary"/>,
  'Borderless': <Base variationKey="borderless"/>,
  'Danger': <Base variationKey="danger"/>
};
