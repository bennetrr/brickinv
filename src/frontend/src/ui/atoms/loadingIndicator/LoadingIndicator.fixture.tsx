import React from 'react';
import { useFixtureSelect } from 'react-cosmos/client';
import { DefaultTheme } from '../../themes';
import LoadingIndicator from './LoadingIndicator.tsx';
import ILoadingIndicatorProps from './ILoadingIndicatorProps.ts';
import { ColorValue } from '../../../../../../../../projects-wemogy/reactbase/src';

interface IBaseProps {
  variationKey: ILoadingIndicatorProps['variationKey'];
}

const Base: React.FC<IBaseProps> = ({ variationKey }) => {
  const [color] = useFixtureSelect<ColorValue>('Color', {
    options: Object.keys(DefaultTheme.referenceValueCollection.color),
    defaultValue: 'gray900'
  });

  return (
    <div style={{
      height: '100%',
      width: '100%',
      display: 'grid',
      placeItems: 'center'
    }}>
      <div>
        <LoadingIndicator
          variationKey={variationKey}
          color={color}
        />
      </div>
    </div>
  );
};

export default {
  'Bar': <Base variationKey="bar"/>,
  'Beat': <Base variationKey="beat"/>,
  'Bounce': <Base variationKey="bounce"/>,
  'Circle': <Base variationKey="circle"/>,
  'ClimbingBox': <Base variationKey="climbingBox"/>,
  'Clip': <Base variationKey="clip"/>,
  'Clock': <Base variationKey="clock"/>,
  'Dot': <Base variationKey="dot"/>,
  'Fade': <Base variationKey="fade"/>,
  'Grid': <Base variationKey="grid"/>,
  'Hash': <Base variationKey="hash"/>,
  'Moon': <Base variationKey="moon"/>,
  'Pacman': <Base variationKey="pacman"/>,
  'Propagate': <Base variationKey="propagate"/>,
  'Puff': <Base variationKey="puff"/>,
  'Pulse': <Base variationKey="pulse"/>,
  'Ring': <Base variationKey="ring"/>,
  'Rise': <Base variationKey="rise"/>,
  'Rotate': <Base variationKey="rotate"/>,
  'Scale': <Base variationKey="scale"/>,
  'Skew': <Base variationKey="skew"/>,
  'Square': <Base variationKey="square"/>,
  'Sync': <Base variationKey="sync"/>
};
