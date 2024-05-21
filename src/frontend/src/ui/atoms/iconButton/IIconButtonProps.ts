import { IconKey, IBaseProps } from "@wemogy/reactbase";

export default interface IIconButtonProps extends IBaseProps {
  // #region custom variation types
  disabled?: boolean;
  // #endregion

  useAnimation?: object;

  icon?: IconKey;

  elementName?: string;
  type?: "button" | "submit" | "reset";

  isLoading?: boolean;

  onPress?: (e: any) => void;
}
