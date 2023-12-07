import { IconKey, TranslationInformation } from '@wemogy/reactbase';
import BadgeSize from './BadgeSize';

export default interface IBadgeProps {
  text: TranslationInformation;
  icon?: IconKey;
  size?: BadgeSize;
  secondary?: boolean;
}
