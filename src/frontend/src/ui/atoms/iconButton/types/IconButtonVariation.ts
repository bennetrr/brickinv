import { ValueOf } from "ts-essentials";
import { IconButton } from "..";

type IconButtonVariation = ReferenceDictionary["iconButton"];

export default IconButtonVariation;

declare global {
  interface IconButtonVariations {
    default: typeof IconButton["variationKey"];
  }

  interface ReferenceDictionary {
    iconButton: ValueOf<IconButtonVariations>;
  }
}
