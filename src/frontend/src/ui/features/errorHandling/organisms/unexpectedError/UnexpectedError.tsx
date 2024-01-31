import React from 'react';
import { StackLayout, Text } from '$/ui/atoms';
import IUnexpectedErrorProps from './IUnexpectedErrorProps';

const UnexpectedError: React.FC<IUnexpectedErrorProps> = () => {

  return (
    <StackLayout orientation="horizontal" gap={2} vCenter>
      <Text variation60Grey600Thin customStyle={{ lineHeight: 1 }}>
        Error
      </Text>
      <StackLayout width={{ custom: 1 }} height={{ custom: 60 }} backgroundColor="grey900"/>
      <Text variation16Gray900Medium customStyle={{ lineHeight: 1 }}>
        Try reloading the page or wait a few minutes.
      </Text>
    </StackLayout>
  );
};

export default UnexpectedError;
