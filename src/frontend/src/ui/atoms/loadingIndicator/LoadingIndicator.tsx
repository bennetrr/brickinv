import { useReferenceValues } from '@wemogy/reactbase';
import React from 'react';
import BeatLoader from 'react-spinners/BeatLoader';
import ILoadingIndicatorProps from './ILoadingIndicatorProps';

const LoadingIndicator: React.FC<ILoadingIndicatorProps> = ({ primary, sm }) => {
  const { color } = useReferenceValues();

  const loaderColor = color[primary ? 'primary' : 'white'];

  return <BeatLoader size={sm ? 8 : 12} color={loaderColor} />;
};

export default LoadingIndicator;
