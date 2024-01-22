import React from 'react';
import { observer } from 'mobx-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppStore } from '$/domain';
import { Button, Checkbox, StackLayout, Text } from '$/ui/atoms';
import { ValueField } from '$/ui/molecules';
import ISetDetailPageProps from './ISetDetailPageProps';

const SetDetailPage: React.FC<ISetDetailPageProps> = ({}) => {
  const { setStore } = useAppStore();
  const navigate = useNavigate();
  const { setId } = useParams();

  if (!setId) {
    return;
  }

  const set = setStore.getSet(setId);

  if (!set) {
    throw 404;
  }

  return (
      <StackLayout margin={2} gap={2}>
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
              icon={'chevronRight'}
              onPress={() => navigate('parts')}
          >
            Parts
          </Button>
        </StackLayout>
      </StackLayout>
  );
};

export default observer(SetDetailPage);
