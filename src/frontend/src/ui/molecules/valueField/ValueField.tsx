import { RenderIf } from '@wemogy/reactbase';
import useClipboard from 'react-use-clipboard';
import React, { useCallback, useMemo, useState } from 'react';
import { Icon, LabeledView, LoadingIndicator, StackLayout, Text, toast } from '../../atoms';
import IValueFieldProps from './IValueFieldProps';

const ValueField: React.FC<IValueFieldProps> = ({
                                                  label,
                                                  value,
                                                  isSecret,
                                                  marginTop,
                                                  marginBottom,
                                                  isLoading,
                                                  automationId
                                                }) => {
  const [showSecret, setShowSecret] = useState(false);
  const actualValue = useMemo((): string | undefined => {
    if (isSecret && !showSecret) {
      return '••••••••••••••••••••••••••••••••••••••••••••••••';
    }
    return value;
  }, [value, isSecret, showSecret]);
  const [_, copyToClipboard] = useClipboard(value || '');

  const handleCopyToClipboardPress = useCallback((): void => {
    copyToClipboard();
    toast.success('Copied to clipboard');
  }, [copyToClipboard]);

  const toggleShowSecret = useCallback((): void => {
    setShowSecret(!showSecret);
  }, [showSecret]);

  return (
    <LabeledView label={label} marginTop={marginTop} marginBottom={marginBottom}>
      <StackLayout
        orientation="horizontal"
        vCenter
        paddingRightLeft={1.5}
        paddingTopBottom
        border={{ custom: 1 }}
        borderColor="grey300"
        borderRadius={0.75}
        backgroundColor="grey100"
      >
        <StackLayout stretch height={2.75} vCenter>
          {isLoading ? (
            <LoadingIndicator beat primary sm/>
          ) : (
            <Text variation14Gray500 textSelectable automationId={automationId}>
              {{ plain: actualValue }}
            </Text>
          )}
        </StackLayout>
        <RenderIf condition={isSecret}>
          <Icon
            eye={!showSecret}
            eyeSlash={showSecret}
            variation2Grey300
            marginRight={1.25}
            onPress={toggleShowSecret}
          />
        </RenderIf>
        <Icon duplicate variation2Grey300 onPress={handleCopyToClipboardPress}/>
      </StackLayout>
    </LabeledView>
  );
};

export default ValueField;
