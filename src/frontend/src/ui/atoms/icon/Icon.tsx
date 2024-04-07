import _ from 'lodash';
import * as HeroIcons from '@heroicons/react/24/outline';
import * as HeroIconsSolid from '@heroicons/react/20/solid';
import { Icon as IconBase, IconKey, IIcons, styled } from '@wemogy/reactbase';
import DuplicateIcon from './custom/DuplicateIcon';
import SupportPhoneWorkerIcon from './custom/SupportPhoneWorkerIcon';
import SettingsGearIcon from './custom/SettingsGearIcon';

function useFillInsteadOfColor<T>(component: T): T {
  (component as any).useFillInsteadOfColor = true;
  return component;
}

type IconMap = { [key in keyof IIcons as string]: any };

export const iconMap: IconMap = {
  user: HeroIcons.UserIcon,
  users: HeroIcons.UsersIcon,
  arrowUp: HeroIcons.ArrowUpIcon,
  arrowUpTray: HeroIcons.ArrowUpTrayIcon,
  shieldCheck: HeroIcons.ShieldCheckIcon,
  adjustmentsHorizontal: HeroIcons.AdjustmentsHorizontalIcon,
  codeBracket: HeroIcons.CodeBracketIcon,
  arrowTopRightOnSquare: HeroIcons.ArrowTopRightOnSquareIcon,
  bookOpen: HeroIcons.BookOpenIcon,
  checkCircle: HeroIconsSolid.CheckCircleIcon,
  exclamationCircle: HeroIconsSolid.ExclamationCircleIcon,
  plus: HeroIcons.PlusIcon,
  folderPlus: HeroIcons.FolderPlusIcon,
  chevronUpDown: HeroIconsSolid.ChevronUpDownIcon,
  home: HeroIcons.HomeIcon,
  lifebuoy: HeroIcons.LifebuoyIcon,
  questionMarkCircle: HeroIcons.QuestionMarkCircleIcon,
  questionMarkCircleFilled: HeroIconsSolid.QuestionMarkCircleIcon,
  duplicate: DuplicateIcon,
  eye: HeroIcons.EyeIcon,
  eyeSlash: HeroIcons.EyeSlashIcon,
  stop: HeroIcons.StopIcon,
  stopSolid: HeroIconsSolid.StopIcon,
  rocketLaunch: HeroIcons.RocketLaunchIcon,
  ellipsisVertical: HeroIcons.EllipsisVerticalIcon,
  server: HeroIcons.ServerIcon,
  trash: HeroIcons.TrashIcon,
  informationCircle: HeroIconsSolid.InformationCircleIcon,
  arrowSmallRight: HeroIcons.ArrowSmallRightIcon,
  chevronRight: HeroIcons.ChevronRightIcon,
  supportPhoneWorker: useFillInsteadOfColor(SupportPhoneWorkerIcon),
  settingsGear: useFillInsteadOfColor(SettingsGearIcon),
  xMark: HeroIconsSolid.XMarkIcon,
  check: HeroIcons.CheckIcon,
  key: HeroIcons.KeyIcon,
  envelopeOpen: HeroIcons.EnvelopeOpenIcon,
  chevronLeft: HeroIcons.ChevronLeftIcon,
  minus: HeroIcons.MinusIcon
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
    size: 3,
    color: 'grey900'
  },
  variation1Grey400: {
    size: 1,
    color: 'grey400'
  },
  variation2Grey300: {
    size: 2,
    color: 'grey300'
  },
  variation2Grey400: {
    size: 2,
    color: 'grey400'
  },
  variation2Grey600: {
    size: 2,
    color: 'grey600'
  },
  variation2Grey700: {
    size: 2,
    color: 'grey700'
  },
  variation2White: {
    size: 2,
    color: 'white'
  },
  variation2PrimaryDark: {
    size: 2,
    color: 'primaryDark'
  },
  variation2Dot5Grey400: {
    size: 2.5,
    color: 'grey400'
  },
  variation3Primary: {
    size: 3,
    color: 'primary'
  },
  variation3White: {
    size: 3,
    color: 'white'
  },
  variation3Red500: {
    size: 3,
    color: 'red500'
  },
  variation3Green500: {
    size: 3,
    color: 'green500'
  },
  variation3Grey300: {
    size: 3,
    color: 'grey300'
  },
  variation5Grey400: {
    size: 5,
    color: 'grey400'
  },
  variation5White: {
    size: 5,
    color: 'white'
  },
  variation3Grey500: {
    size: 3,
    color: 'grey500'
  },
  variation3Grey400: {
    size: 3,
    color: 'grey400'
  },
  variation3GreyLight: {
    size: 3,
    color: 'greyLight'
  },
  navButton: {
    size: 5,
    color: 'grey700',
    marginLeft: { custom: 'auto' }
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
