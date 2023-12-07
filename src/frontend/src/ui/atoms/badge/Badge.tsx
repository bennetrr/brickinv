import { StackLayout } from '@wemogy/reactbase';
import React from 'react';
import { Icon } from '../icon';
import { Text } from '../text';
import IBadgeProps from './IBadgeProps';

const Badge: React.FC<IBadgeProps> = ({ text, icon, secondary }) => {
  return (
    <StackLayout
      orientation="horizontal"
      vCenter
      backgroundColor={secondary ? 'indigo100' : 'green100'}
      width={{ custom: 'fit-content' }}
      borderRadius={secondary ? 1.75 : 1.5}
      paddingRightLeft={secondary ? 2 : 1}
      paddingTopBottom={0.5}
    >
      {icon ? <Icon icon={icon} size={2} marginRight={0.5} /> : null}
      <Text cta={!secondary} variation14PrimaryDarkMedium fontWeight={secondary ? undefined : 'bold'}>
        {text}
      </Text>
    </StackLayout>
  );
};

export default Badge;
