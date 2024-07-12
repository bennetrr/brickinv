import React from 'react';
import {useModalStore} from '@wemogy/reactbase';
import Modal from './Modal.tsx';
import {Button} from '../button';
import {StackLayout} from '../stackLayout';
import {TextInput} from '../textInput';

interface IBaseProps {

}

const Base: React.FC<IBaseProps> = ({  }) => {
  const { openModal, closeModal } = useModalStore();

  return (
    <>
      <Button
        primary
        onPress={() => openModal('exampleModal')}
      >
        Display Modal
      </Button>

      <Modal modalKey="exampleModal" title="Eample Modal" >
        <StackLayout gap>
          <TextInput
            stretch
            placeholder="Example Input"
          />

          <StackLayout orientation="horizontal" vCenter gap={1.5}>
            <Button icon="xMark" secondary width100 onPress={() => closeModal()}>
              Cancel
            </Button>

            <Button icon="check" primary width100 onPress={() => closeModal()}>
              Confirm
            </Button>
          </StackLayout>
        </StackLayout>
      </Modal>
    </>
  );
};

export default {
  'Base': <Base/>
};
