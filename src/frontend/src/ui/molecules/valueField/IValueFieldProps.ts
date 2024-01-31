import { Factor, TranslationInformation } from '@wemogy/reactbase';

export default interface IValueFieldProps {
  label: TranslationInformation;
  value: string | undefined;
  isSecret?: boolean;
  marginTop?: Factor;
  marginBottom?: Factor;
  isLoading?: boolean;
  automationId?: string;
}
