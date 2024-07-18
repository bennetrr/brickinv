import React, {useState} from 'react';
import Checkbox from './Checkbox.tsx';
import {useFixtureInput} from 'react-cosmos/client';
interface IBaseProps {

}

const Base: React.FC<IBaseProps> = ({  }) => {
  const [value, setValue] = useState(false);

  const [label] = useFixtureInput('Label', 'Lorem ipsum');

  const [disabled] = useFixtureInput('Disabled', false);

  return (
    <Checkbox
      checked={value}
      onChange={setValue}
      label={label}
      disabled={disabled}
    />
  );
};

export default {
  'Base': <Base/>
};
