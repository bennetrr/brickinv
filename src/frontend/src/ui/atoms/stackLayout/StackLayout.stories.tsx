import { StoryObj, ComponentMeta } from '@storybook/react';
import StackLayout from './StackLayout';
import IStackLayoutProps from './IStackLayoutProps';

// CSF 3.0
export default {
  component: StackLayout,
  title: 'Atoms/StackLayout'
} as ComponentMeta<typeof StackLayout>;

// CSF 3.0 - explicit render function
export const Default: StoryObj<IStackLayoutProps> = {
  args: {
  }
};
