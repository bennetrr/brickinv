import React from 'react';
import { LabeledView, TextInput } from '../../atoms';
import ITextInputFieldProps from './ITextInputFieldProps';

const TextInputField: React.FC<ITextInputFieldProps> = ({
                                                          label,
                                                          placeholder,
                                                          value,
                                                          addSpaceAfter,
                                                          icon,
                                                          name,
                                                          textContentType,
                                                          automationId,
                                                          required,
                                                          marginBottom,
                                                          enforceLowercase,
                                                          disabled,
                                                          multiline,
                                                          autoFocus,
                                                          onChange,
                                                          onBlur,
                                                          onEnterKeyPress
                                                        }) => {
  return (
    <LabeledView label={label} marginBottom={marginBottom}>
      <TextInput
        elementName={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        onEnterKeyPress={onEnterKeyPress}
        placeholder={placeholder}
        marginBottom={addSpaceAfter ? 4 : 0}
        icon={icon}
        textContentType={textContentType}
        automationId={automationId}
        required={required}
        enforceLowercase={enforceLowercase}
        disabled={disabled}
        multiline={multiline}
        minHeight={multiline ? 10 : undefined}
        autoFocus={autoFocus}
      />
    </LabeledView>
  );
};

export default TextInputField;
