import _ from 'lodash';
import { Icon as IconBase, IconKey, IIcons, styled } from '@wemogy/reactbase';
import * as HeroIcons from '@heroicons/react/24/outline';
import * as HeroIconsSolid from '@heroicons/react/20/solid';
import DuplicateIcon from './custom/DuplicateIcon';
import SupportPhoneWorkerIcon from './custom/SupportPhoneWorkerIcon';
import SettingsGearIcon from './custom/SettingsGearIcon';

function useFillInsteadOfColor<T>(component: T): T {
  (component as any).useFillInsteadOfColor = true;
  return component;
}

type IconMap = { [key in keyof IIcons as string]: any };

export const iconMap: IconMap = {
  adjustmentsHorizontal: HeroIcons.AdjustmentsHorizontalIcon,
  arrowSmallRight: HeroIcons.ArrowRightIcon,
  arrowTopRightOnSquare: HeroIcons.ArrowTopRightOnSquareIcon,
  arrowUp: HeroIcons.ArrowUpIcon,
  arrowUpTray: HeroIcons.ArrowUpTrayIcon,
  bookOpen: HeroIcons.BookOpenIcon,
  check: HeroIcons.CheckIcon,
  checkCircle: HeroIconsSolid.CheckCircleIcon,
  chevronLeft: HeroIcons.ChevronLeftIcon,
  chevronRight: HeroIcons.ChevronRightIcon,
  chevronUpDown: HeroIconsSolid.ChevronUpDownIcon,
  codeBracket: HeroIcons.CodeBracketIcon,
  duplicate: DuplicateIcon,
  ellipsisVertical: HeroIcons.EllipsisVerticalIcon,
  envelopeOpen: HeroIcons.EnvelopeOpenIcon,
  exclamationCircle: HeroIconsSolid.ExclamationCircleIcon,
  eye: HeroIcons.EyeIcon,
  eyeSlash: HeroIcons.EyeSlashIcon,
  folderPlus: HeroIcons.FolderPlusIcon,
  home: HeroIcons.HomeIcon,
  informationCircle: HeroIconsSolid.InformationCircleIcon,
  key: HeroIcons.KeyIcon,
  lifebuoy: HeroIcons.LifebuoyIcon,
  minus: HeroIcons.MinusIcon,
  plus: HeroIcons.PlusIcon,
  questionMarkCircle: HeroIcons.QuestionMarkCircleIcon,
  questionMarkCircleFilled: HeroIconsSolid.QuestionMarkCircleIcon,
  rocketLaunch: HeroIcons.RocketLaunchIcon,
  server: HeroIcons.ServerIcon,
  settingsGear: useFillInsteadOfColor(SettingsGearIcon),
  shieldCheck: HeroIcons.ShieldCheckIcon,
  stop: HeroIcons.StopIcon,
  stopSolid: HeroIconsSolid.StopIcon,
  supportPhoneWorker: useFillInsteadOfColor(SupportPhoneWorkerIcon),
  trash: HeroIcons.TrashIcon,
  user: HeroIcons.UserIcon,
  users: HeroIcons.UsersIcon,
  xMark: HeroIconsSolid.XMarkIcon
};

for (let key in iconMap) {
  iconMap[key] = styled(iconMap[key])`
    * {
      ${iconMap[key].useFillInsteadOfColor ? 'fill' : 'color'}: ${(props: any) => props._color};
    }
  `;
}

export const iconMapKeys = _.keys(iconMap) as IconKey[];

const Icon = IconBase.extendVariations({
  base: {
    size: 2,
    color: 'gray900'
  },
  variation2Primary300: {
    size: 2,
    color: 'primary300'
  },
  variation2Primary500: {
    size: 2,
    color: 'primary500'
  },
  variation2White: {
    size: 2,
    color: 'white'
  },
  variation2Gray500: {
    size: 2,
    color: 'gray500'
  },
  variation2Gray900: {
    size: 2,
    color: 'gray900'
  },
  variation3Primary500: {
    size: 3,
    color: 'primary500'
  },
  variation3Gray300: {
    size: 3,
    color: 'gray300'
  },
  variation3Gray500: {
    size: 3,
    color: 'gray500'
  },
  variation3Red500: {
    size: 3,
    color: 'red500'
  },
  variation3Green500: {
    size: 3,
    color: 'green500'
  },
  variation5White: {
    size: 5,
    color: 'white'
  },
  navigationButton: {
    base: {
      size: 5,
      color: 'gray700',
      marginLeft: { custom: 'auto' },
    },
    disabled: {
      color: 'gray400',
    }
  }
}).registerDependencies({
  iconResolver: props => {
    const icon = iconMapKeys.find(key => props[key]);

    return icon ? iconMap[icon] : null;
  }
});

export default Icon;

declare global {
  interface IconVariations {
    spaceBlocksCore: typeof Icon['variationKey'];
  }
}

declare module '@wemogy/reactbase' {
  export interface IIcons {
    arrowUp?: boolean;
    arrowUpTray?: boolean;
    shieldCheck?: boolean;
    adjustmentsHorizontal?: boolean;
    codeBracket?: boolean;
    arrowTopRightOnSquare?: boolean;
    bookOpen?: boolean;
    checkCircle?: boolean;
    check?: boolean;
    exclamationCircle?: boolean;
    plus?: boolean;
    folderPlus?: boolean;
    chevronUpDown?: boolean;
    home?: boolean;
    lifebuoy?: boolean;
    users?: boolean;
    questionMarkCircle?: boolean;
    questionMarkCircleFilled?: boolean;
    duplicate?: boolean;
    eye?: boolean;
    eyeSlash?: boolean;
    stop?: boolean;
    stopSolid?: boolean;
    rocketLaunch?: boolean;
    ellipsisVertical?: boolean;
    server?: boolean;
    trash?: boolean;
    informationCircle?: boolean;
    arrowSmallRight?: boolean;
    supportPhoneWorker?: boolean;
    settingsGear?: boolean;
    chevronRight?: boolean;
    xMark?: boolean;
    key?: boolean;
    envelopeOpen?: boolean;
    chevronLeft?: boolean;
    minus?: boolean;
  }
}
