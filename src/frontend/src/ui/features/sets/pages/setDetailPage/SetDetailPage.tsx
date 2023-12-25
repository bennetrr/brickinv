import React from 'react';
import ISetDetailPageProps from './ISetDetailPageProps';
import { useAppStore } from '$/domain';
import { observer } from 'mobx-react';
import {
  Button, Checkbox,
  StackLayout, Text,
  ValueField
} from '$/ui';
import { useNavigate, useParams } from 'react-router-dom';

const SetDetailPage: React.FC<ISetDetailPageProps> = ({}) => {
  const { legoSetStore } = useAppStore();
  const navigate = useNavigate();
  const { setId } = useParams();
  console.log('SetDetailPage', setId)
  
  if (!setId) {
    return;
  }
  
  const set = legoSetStore.getSet(setId);
  
  if (!set) {
    return null;  // TODO: Show 404 page
  }
  
  return (
      <StackLayout marginRightLeft={4} gap={2} marginTop={2}>
        <ValueField label="Set Name" value={set.setName}/>
        <ValueField label="Set ID" value={set.setId}/>
        <ValueField label="Created" value={set.created.toLocaleString()}/>
        <ValueField label="Last Updated" value={set.updated.toLocaleString()}/>

        <StackLayout orientation="horizontal" vCenter gap>
          <Checkbox
              checked={set.forSale}
              disabled
          />
          <Text variation14Gray900>
            For sale
          </Text>
        </StackLayout>

        <StackLayout orientation="horizontal" vCenter gap>
          <Checkbox
              checked={set.finished}
              disabled
          />
          <Text variation14Gray900>
            Finished
          </Text>
        </StackLayout>

        <StackLayout orientation="horizontal" vCenter gap>
          <Text variation14Gray900>
            Parts:
          </Text>
          
          <ValueField label="" value={set.presentParts.toString()}/>
          
          <Text variation14Gray900>
            finished from
          </Text>

          <ValueField label="" value={set.totalParts.toString()}/>

          <Text variation14Gray900>
            total
          </Text>
        </StackLayout>
        
        <StackLayout>
          <Button
              navButton
              icon={"chevronRight"}
              onPress={() => navigate('parts')}
          >
            Parts
          </Button>
        </StackLayout>
      </StackLayout>
  );
};

export default observer(SetDetailPage);
