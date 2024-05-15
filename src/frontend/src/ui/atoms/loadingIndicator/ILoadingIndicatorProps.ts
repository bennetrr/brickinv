import { ColorValue } from '@wemogy/reactbase';

export default interface ILoadingIndicatorProps {
  color: ColorValue;
  size?: number;
  bar?: boolean;
  beat?: boolean;
  bounce?: boolean;
  circle?: boolean;
  climbingBox?: boolean;
  clip?: boolean;
  clock?: boolean;
  dot?: boolean;
  fade?: boolean;
  grid?: boolean;
  hash?: boolean;
  moon?: boolean;
  pacman?: boolean;
  propagate?: boolean;
  puff?: boolean;
  pulse?: boolean;
  ring?: boolean;
  rise?: boolean;
  rotate?: boolean;
  scale?: boolean;
  skew?: boolean;
  square?: boolean;
  sync?: boolean;
  variationKey?: 'bar' | 'beat' | 'bounce' | 'circle' | 'climbingBox' | 'clip' | 'clock' | 'dot' | 'fade' | 'grid' | 'hash' | 'moon' | 'pacman' | 'propagate' | 'puff' | 'pulse' | 'ring' | 'rise' | 'rotate' | 'scale' | 'skew' | 'square' | 'sync';
}
