import React from 'react';
import { useFixtureInput, useFixtureSelect } from 'react-cosmos/client';
import Text from './Text.tsx';

interface IBaseProps {
  variationKey: string;
  _darkBg?: boolean;
}

const Base: React.FC<IBaseProps> = ({ variationKey, _darkBg }) => {
  const [children] = useFixtureInput('Text', 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.');
  const [textSelectable] = useFixtureInput('Selectable', false);
  const [lineBreak] = useFixtureSelect('Line break', { options: [ 'auto', 'normal', 'anywhere', 'loose', 'strict' ] });
  const [overflow] = useFixtureSelect('Overflow', { options: [ 'auto', 'hidden', 'visible', 'scroll' ] });
  const [maxLines] = useFixtureInput('Maximum number of lines', 0);

  const component = (
    <Text
      variationKey={variationKey}
      textSelectable={textSelectable}
      overflow={overflow}
      lineBreak={lineBreak}
      maxLines={maxLines}
    >
      {children}
    </Text>
  );

  if (!_darkBg) {
    return component;
  }

  return (
    <div style={{ backgroundColor: 'black' , padding: 16 }}>
      {component}
    </div>
  )
};

export default {
  'Default (14px Gray900 Regular)': <Base variationKey="base"/>,
  'Default Medium (14px Gray900 Medium)': <Base variationKey="medium"/>,
  '12px Gray500 Medium': <Base variationKey="variation12Gray500Medium"/>,
  '14px Primary500 Regular': <Base variationKey="variation14Primary500"/>,
  '14px Gray500 Regular': <Base variationKey="variation14Gray500"/>,
  '14px Gray500 Medium': <Base variationKey="variation14Gray500Medium"/>,
  '14px Red500 Medium': <Base variationKey="variation14Red500Medium"/>,
  '14px Green500 Medium': <Base variationKey="variation14Green500Medium"/>,
  '14px White Medium': <Base variationKey="variation14WhiteMedium" _darkBg/>,
  '18px Gray900 Medium': <Base variationKey="variation18Gray900"/>,
  '20px White Semibold': <Base variationKey="variation20WhiteSemi" _darkBg/>,
  '30px Gray900 Bold': <Base variationKey="variation30Gray900Bold"/>,
  '60px Gray600 Thin': <Base variationKey="variation60Gray600Thin"/>,
};
