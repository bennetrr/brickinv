import React, { useCallback } from 'react';
import { useFixtureInput, useFixtureSelect } from 'react-cosmos/client';
import { IIcons } from '@wemogy/reactbase';
import { iconMapKeys } from '../icon/Icon.tsx';
import { toast } from '../toaster';
import Button from './Button.tsx';

interface IBaseProps {
  variationKey: string;
  _defaultIcon?: keyof IIcons | 'undefined';
  _defaultIconPos?: 'left' | 'right';
  _defaultIconSpacing?: number;
}

const Base: React.FC<IBaseProps> = ({ variationKey, _defaultIcon = 'undefined', _defaultIconPos = 'left', _defaultIconSpacing = 2 }) => {
  const handlePress = useCallback(() => {
    toast.information('Pressed button');
  }, []);

  const [children] = useFixtureInput('Text', 'Button');
  const [icon] = useFixtureSelect<keyof IIcons | 'undefined'>('Icon', {
    options: ['undefined', ...iconMapKeys],
    defaultValue: _defaultIcon
  });
  const [iconPosition] = useFixtureSelect('Icon Position', {
    options: ['left', 'right'],
    defaultValue: _defaultIconPos
  });
  const [iconSpacing] = useFixtureInput('Icon Spacing', _defaultIconSpacing);
  const [isLoading] = useFixtureInput('Loading', false);
  const [disabled] = useFixtureInput('Disabled', false);

  return (
    <Button
      onPress={handlePress}
      variationKey={variationKey + (disabled && 'Disabled' || '')}
      icon={icon === 'undefined' ? undefined : icon}
      iconPosition={iconPosition}
      iconSpacing={iconSpacing}
      isLoading={isLoading}
      disabled={disabled}
    >
      {children}
    </Button>
  );
};

export default {
  'Primary': <Base variationKey="primary"/>,
  'Secondary': <Base variationKey="secondary"/>,
  'Borderless': <Base variationKey="borderless"/>,
  'Danger': <Base variationKey="danger"/>,
  'Navigation': <Base variationKey="navigation" _defaultIcon="chevronRight" _defaultIconPos="right" _defaultIconSpacing={27}/>
};
