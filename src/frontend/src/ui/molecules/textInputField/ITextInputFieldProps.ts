import { Factor, IconKey, TextContentType, TranslationInformation } from '@wemogy/reactbase';

export default interface ITextInputFieldProps {
  label: TranslationInformation;
  placeholder: TranslationInformation;
  value: string;
  addSpaceAfter?: boolean;
  icon?: IconKey;
  name?: string;
  textContentType?: TextContentType;
  automationId?: string;
  required?: boolean;
  marginBottom?: Factor;
  enforceLowercase?: boolean;
  disabled?: boolean;
  multiline?: boolean;
  autoFocus?: boolean;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  onEnterKeyPress?: () => void;
}
