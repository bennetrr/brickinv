import React, { useCallback, useEffect, useMemo, useState } from 'react';
import ISetOverviewPageProps from './ISetOverviewPageProps';
import { useAppStore } from '$/domain';
import { observer } from 'mobx-react';
import { Button, StackLayout, Text, TextInput, AddSetModal, LegoSetCard, IAddSetModalParameters } from '$/ui';
import { useModalStore } from '@wemogy/reactbase';

const SetOverviewPage: React.FC<ISetOverviewPageProps> = ({}) => {
  const { legoSetStore } = useAppStore();
  const { openModal } = useModalStore();
  const [searchFieldText, setSearchFieldText] = useState('');
  
  const handleAddSetPress = useCallback(() => {
    console.log(searchFieldText)
    openModal('addSet', { setId: searchFieldText } satisfies IAddSetModalParameters);
  }, [searchFieldText, openModal]);

  useEffect(() => {
    legoSetStore.queryLegoSets();
  }, []);
  
  const sets = useMemo(() => {
    return legoSetStore.items.filter(x => {
      if (!searchFieldText) return true;
      return x.setName.toLowerCase().includes(searchFieldText.toLowerCase()) || x.setId.includes(searchFieldText);
    });
  }, [searchFieldText, legoSetStore.items, legoSetStore.items.length]);
  
  return (
      <>
        <StackLayout>
          <StackLayout orientation="horizontal" marginTop marginRightLeft={30} gap>
            <StackLayout stretch>
              <TextInput
                stretch
                placeholder="Filter sets by name or number or add a new set"
                onChange={setSearchFieldText}
                value={searchFieldText}
              />
            </StackLayout>
            
            <Button
                secondary14
                height={5}
                width={5}
                icon="plus"
                onPress={handleAddSetPress}
            >
              {""}
            </Button>
          </StackLayout>
  
          {sets.length !== 0 ?
              <StackLayout wrap padding={2}>
                {sets.map(x => <LegoSetCard legoSet={x} key={x.id}/>)}
              </StackLayout>
              :
              <StackLayout padding={2} hCenter>
                <Text>
                  No sets found
                </Text>

                <Button
                    borderless
                    onPress={handleAddSetPress}
                >
                  Add a new set
                </Button>

                <Button
                    borderless
                    onPress={() => setSearchFieldText('')}
                >
                  Clear filters
                </Button>
              </StackLayout>
          }
        </StackLayout>
        
        <AddSetModal/>
      </>
  );
};

export default observer(SetOverviewPage);
