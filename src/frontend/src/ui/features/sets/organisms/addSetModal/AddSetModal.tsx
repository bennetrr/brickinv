import React, { useCallback, useEffect, useState } from 'react';
import IAddSetModalProps from './IAddSetModalProps';
import {
  Modal,
  StackLayout,
  Button,
  Text,
  TextInput,
  IAddSetModalParameters,
  Checkbox
} from '$/ui';
import { useModalStore } from '@wemogy/reactbase';
import { useAppStore } from '$/domain';
import { observer } from 'mobx-react';

const AddSetModal: React.FC<IAddSetModalProps> = ({}) => {
  const {closeModal, getActiveParameters} = useModalStore();
  const {legoSetStore} = useAppStore();
  const activeParameters = getActiveParameters<IAddSetModalParameters>('addSet');
  const [setId, setSetId] = useState('');
  const [forSale, setForSale] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setSetId(activeParameters?.setId || '');
  }, [activeParameters?.setId]);
  
  const handleCancelPress = useCallback(() => {
    closeModal();
  }, [closeModal]);
  
  const handleAddPress = useCallback(async () => {
    setIsLoading(true);
    await legoSetStore.createSet(setId, forSale);
    setIsLoading(false);
    closeModal();
  }, [legoSetStore, setId, forSale, closeModal]);
  
  return (
      <Modal modalKey="addSet" withoutHeader withoutScrollView>
        <StackLayout>
          <StackLayout>
            <Text variation18Grey900Medium marginTop={2.5}>
              Add new set
            </Text>
          </StackLayout>
          
          <StackLayout marginTop={1.5} marginBottom={3} gap>
            <TextInput
                stretch
                placeholder="Set number"
                onChange={setSetId}
                value={setId}
            />
            
            <StackLayout orientation="horizontal" vCenter onPress={() => setForSale(!forSale)} gap={1.5}>
              <Checkbox
                  checked={forSale}
                  onChange={setForSale}
              />
              <Text variation14Gray900>
                For sale
              </Text>
            </StackLayout>
          </StackLayout>
          
          <StackLayout orientation="horizontal" vCenter>
            <Button secondary14 width100 onPress={handleCancelPress}>
              Cancel
            </Button>
            
            <Button marginLeft={1.5} primary14 width100 onPress={handleAddPress} isLoading={isLoading}>
              Add
            </Button>
          </StackLayout>
        </StackLayout>
      </Modal>
  )
}

export default observer(AddSetModal);
