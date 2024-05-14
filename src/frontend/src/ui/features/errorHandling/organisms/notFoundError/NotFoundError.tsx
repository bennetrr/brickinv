import React from 'react';
import { StackLayout, Text } from '../../../../atoms';
import INotFoundErrorProps from './INotFoundErrorProps';

const NotFoundError: React.FC<INotFoundErrorProps> = () => {

  return (
    <StackLayout orientation="horizontal" gap={2} vCenter>
      <Text variation60Gray600Thin customStyle={{ lineHeight: 1 }}>
        404
      </Text>
      <StackLayout width={{ custom: 1 }} height={{ custom: 60 }} backgroundColor="grey900"/>
      <Text customStyle={{ lineHeight: 1 }}>
        The page you are looking for does not exist.
      </Text>
    </StackLayout>
  );
};

export default NotFoundError;
