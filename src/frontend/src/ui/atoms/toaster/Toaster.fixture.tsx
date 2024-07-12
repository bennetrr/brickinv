import React from 'react';
import { useFixtureInput } from 'react-cosmos/client';
import {Button} from '../button';
import toast from './Toaster.tsx';

interface IBaseProps {
  toastMethod: (message: string) => void;
}

const Base: React.FC<IBaseProps> = ({ toastMethod }) => {
  const [children] = useFixtureInput('Text', 'Lorem ipsum dolor sit amet');

  return (
    <Button
      primary
      onPress={() => toastMethod(children)}
    >
      Display Toast
    </Button>
  );
};

export default {
  'Information': <Base toastMethod={toast.information.bind(toast)}/>,
  'Error': <Base toastMethod={toast.error.bind(toast)}/>,
  'Success': <Base toastMethod={toast.success.bind(toast)}/>,
};
