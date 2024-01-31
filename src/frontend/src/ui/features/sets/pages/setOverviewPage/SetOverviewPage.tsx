import React, { useCallback, useState } from 'react';
import { observer } from 'mobx-react';
import { RenderIf, useModalStore } from '@wemogy/reactbase';
import { useAppStore } from '$/domain';
import { Button, StackLayout, Text, TextInput } from '$/ui/atoms';
import { AddSetModal, IAddSetModalParameters, SetCard } from '$/ui/features/sets/organisms';
import ISetOverviewPageProps from './ISetOverviewPageProps';

const SetOverviewPage: React.FC<ISetOverviewPageProps> = ({}) => {
  const { setStore } = useAppStore();
  const { openModal } = useModalStore();
  const [searchFieldText, setSearchFieldText] = useState('');

  const handleAddSetPress = useCallback(() => {
    openModal('addSet', { setId: searchFieldText, setSearchFieldText } satisfies IAddSetModalParameters);
  }, [searchFieldText, openModal]);

  const sets = setStore.items.filter(x => {
    if (!searchFieldText) {
      return true;
    }
    return x.setName.toLowerCase().includes(searchFieldText.toLowerCase()) || x.setId.includes(searchFieldText);
  });

  return (
    <>
      <StackLayout>
        <StackLayout orientation="horizontal" margin={2} gap>
          <StackLayout stretch>
            <TextInput
              stretch
              placeholder="Filter sets by name or number or add a new set"
              onChange={setSearchFieldText}
              value={searchFieldText}
            />
          </StackLayout>

          <Button
            iconButton
            icon="plus"
            onPress={handleAddSetPress}
          >{''}</Button>
        </StackLayout>

        {sets.length !== 0 ?
          <StackLayout wrap marginRightLeft={2} marginBottom={2} orientation="horizontal" gap={2}>
            {sets.map(x => <SetCard set={x} key={x.id}/>)}
          </StackLayout>
          :
          <StackLayout marginRightLeft={2} hCenter>
            <Text>
              No sets found
            </Text>

            <Button
              borderless
              onPress={handleAddSetPress}
            >
              Add a new set
            </Button>

            <RenderIf condition={searchFieldText !== ''}>
              <Button
                borderless
                onPress={() => setSearchFieldText('')}
              >
                Clear filters
              </Button>
            </RenderIf>
          </StackLayout>
        }
      </StackLayout>

      <AddSetModal/>
    </>
  );
};

export default observer(SetOverviewPage);
