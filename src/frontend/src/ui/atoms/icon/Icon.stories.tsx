import { ComponentMeta, StoryObj } from '@storybook/react';
import { IIconProps, StackLayout } from '@wemogy/reactbase';

import Icon, { iconMapKeys } from './Icon';

// CSF 3.0
export default {
  component: Icon,
  title: 'Atoms/Icon'
} as ComponentMeta<typeof Icon>;

// CSF 3.0 - explicit render function
export const Default: StoryObj<IIconProps> = {
  args: {
    icon: 'user'
  }
};

export const Overview: StoryObj<IIconProps> = {
  render: () => (
      <StackLayout>
        {iconMapKeys.map(iconKey => (
            <StackLayout orientation="horizontal" vCenter>
              <Icon icon={iconKey}/>
              <span className="ml-2">{iconKey}</span>
            </StackLayout>
        ))}
      </StackLayout>
  )
};
