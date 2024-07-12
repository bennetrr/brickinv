import React, {useState} from 'react';
import TextInput from './TextInput.tsx';
import {useFixtureInput, useFixtureSelect} from 'react-cosmos/client';
import {IIcons} from '@wemogy/reactbase';
import {iconMapKeys} from '../icon/Icon.tsx';
import {toast} from '../toaster';

interface IBaseProps {

}

const Base: React.FC<IBaseProps> = ({  }) => {
  const [value, setValue] = useState('');

  const [placeholder] = useFixtureInput('Placeholder', 'Lorem ipsum');
  const [type] = useFixtureSelect('Input Type', {
    options: ['default', 'email-address', 'phone-pad', 'numeric', 'url', 'password', 'newPassword'],
    defaultValue: 'default'
  });
  const [icon] = useFixtureSelect<keyof IIcons | 'undefined'>('Icon', {
    options: ['undefined', ...iconMapKeys],
    defaultValue: 'undefined'
  });
  const [iconPosition] = useFixtureSelect('Icon Position', {
    options: ['left', 'right'],
    defaultValue: 'right'
  });
  const [disabled] = useFixtureInput('Disabled', false);
  const [autocomplete] = useFixtureInput('Autocomplete', false);

  return (
    <TextInput
      value={value}
      onChange={setValue}
      placeholder={placeholder}
      icon={icon === 'undefined' ? undefined : icon}
      iconPosition={iconPosition}
      disabled={disabled}
      baseDisabled={disabled}
      keyboardType={type.includes('word') || type}
      textContentType={type.includes('word') && type}
      onIconPress={() => toast.information('Icon clicked')}

      autocompleteResults={autocomplete ? [
        {title: 'Apple', key: 'apple', reference: null},
        {title: 'Avocado', key: 'avocado', reference: null},
        {title: 'Banana', key: 'banana', reference: null},
      ] : undefined}
      onAutocompleteResultSelected={(x) => setValue(x.title)}
    />
  );
};

export default {
  'Base': <Base/>
};
