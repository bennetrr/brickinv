import React from 'react';
import { useFixtureInput } from 'react-cosmos/client';
import LabeledView from './LabeledView.tsx';
import {TextInput} from '../textInput';

interface IBaseProps {
  variationKey: string;
}

const Base: React.FC<IBaseProps> = ({ variationKey }) => {
  const [label] = useFixtureInput('Text', 'Lorem ipsum dolor sit amet');

  return (
    <LabeledView
      variationKey={variationKey}
      label={label}
    >
      <TextInput />
    </LabeledView>
  );
};

export default {
  'Default (14px Gray900 Regular)': <Base variationKey="base"/>,
};
