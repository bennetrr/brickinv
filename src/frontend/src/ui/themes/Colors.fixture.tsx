import { StackLayout, Text } from '../atoms';
import DefaultTheme from './DefaultTheme.ts';

interface IColorGridProps {
  colors: (keyof typeof DefaultTheme.referenceValueCollection.color)[];
}

const ColorGrid: React.FC<IColorGridProps> = ({ colors }) => (
  <div style={{
    padding: 16,
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 160px)',
    gridTemplateRows: `repeat(${Math.ceil(colors.length / 3)}, 160px)`,
    gap: 8
  }}>
    {colors.map((color, i) => (
      <StackLayout colorSquare backgroundColor={color}>
        <Text textSelectable fontColor={i >= 6 ? 'white' : 'black'}>
          {color}
        </Text>
      </StackLayout>
    ))}
  </div>
);

export default {
  'Primary': <ColorGrid
    colors={['primary100', 'primary200', 'primary300', 'primary400', 'primary500', 'primary600', 'primary700', 'primary800', 'primary900']}/>,
  'Gray': <ColorGrid
    colors={['white', 'gray100', 'gray200', 'gray300', 'gray400', 'gray500', 'gray600', 'gray700', 'gray800', 'gray900', 'black']}/>,
  'Green': <ColorGrid
    colors={['green100', 'green200', 'green300', 'green400', 'green500', 'green600', 'green700', 'green800', 'green900']}/>,
  'Red': <ColorGrid
    colors={['red100', 'red200', 'red300', 'red400', 'red500', 'red600', 'red700', 'red800', 'red900']}/>
};
