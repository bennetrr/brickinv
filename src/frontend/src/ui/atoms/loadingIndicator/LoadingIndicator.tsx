import React from 'react';
import { useReferenceValues } from '@wemogy/reactbase';
import {
  BarLoader,
  BeatLoader,
  BounceLoader,
  CircleLoader,
  ClimbingBoxLoader,
  ClipLoader,
  ClockLoader,
  DotLoader,
  FadeLoader,
  GridLoader,
  HashLoader,
  MoonLoader,
  PacmanLoader,
  PropagateLoader,
  PuffLoader,
  PulseLoader,
  RingLoader,
  RiseLoader,
  RotateLoader,
  ScaleLoader,
  SkewLoader,
  SquareLoader,
  SyncLoader
} from 'react-spinners';
import ILoadingIndicatorProps from './ILoadingIndicatorProps';

const LoadingIndicator: React.FC<ILoadingIndicatorProps> = (props) => {
  const { color } = useReferenceValues();  // TODO: Generates warning if component is rendered for the first time

  const loaderProps = {
    color: props.color === undefined || typeof props.color === 'string' ? color[props.color || 'white'] : props.color.custom,
    size: props.size || 16
  };

  if (props.bar || props.variationKey === 'bar') {
    return <BarLoader {...loaderProps}/>;
  }
  if (props.beat || props.variationKey === 'beat') {
    return <BeatLoader {...loaderProps}/>;
  }
  if (props.bounce || props.variationKey === 'bounce') {
    return <BounceLoader {...loaderProps}/>;
  }
  if (props.circle || props.variationKey === 'circle') {
    return <CircleLoader {...loaderProps}/>;
  }
  if (props.climbingBox || props.variationKey === 'climbingBox') {
    return <ClimbingBoxLoader {...loaderProps}/>;
  }
  if (props.clip || props.variationKey === 'clip') {
    return <ClipLoader {...loaderProps}/>;
  }
  if (props.clock || props.variationKey === 'clock') {
    return <ClockLoader {...loaderProps}/>;
  }
  if (props.dot || props.variationKey === 'dot') {
    return <DotLoader {...loaderProps}/>;
  }
  if (props.fade || props.variationKey === 'fade') {
    return <FadeLoader {...loaderProps}/>;
  }
  if (props.grid || props.variationKey === 'grid') {
    return <GridLoader {...loaderProps}/>;
  }
  if (props.hash || props.variationKey === 'hash') {
    return <HashLoader {...loaderProps}/>;
  }
  if (props.moon || props.variationKey === 'moon') {
    return <MoonLoader {...loaderProps}/>;
  }
  if (props.pacman || props.variationKey === 'pacman') {
    return <PacmanLoader {...loaderProps}/>;
  }
  if (props.propagate || props.variationKey === 'propagate') {
    return <PropagateLoader {...loaderProps}/>;
  }
  if (props.puff || props.variationKey === 'puff') {
    return <PuffLoader {...loaderProps}/>;
  }
  if (props.pulse || props.variationKey === 'pulse') {
    return <PulseLoader {...loaderProps}/>;
  }
  if (props.ring || props.variationKey === 'ring') {
    return <RingLoader {...loaderProps}/>;
  }
  if (props.rise || props.variationKey === 'rise') {
    return <RiseLoader {...loaderProps}/>;
  }
  if (props.rotate || props.variationKey === 'rotate') {
    return <RotateLoader {...loaderProps}/>;
  }
  if (props.scale || props.variationKey === 'scale') {
    return <ScaleLoader {...loaderProps}/>;
  }
  if (props.skew || props.variationKey === 'skew') {
    return <SkewLoader {...loaderProps}/>;
  }
  if (props.square || props.variationKey === 'square') {
    return <SquareLoader {...loaderProps}/>;
  }
  if (props.sync || props.variationKey === 'sync') {
    return <SyncLoader {...loaderProps}/>;
  }

  throw new Error('Wrong loader type specified.');
};

export default LoadingIndicator;
