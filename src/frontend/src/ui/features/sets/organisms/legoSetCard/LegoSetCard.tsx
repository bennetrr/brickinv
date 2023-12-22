import React from 'react';
import ILegoSetCardProps from './ILegoSetCardProps';
import { observer } from 'mobx-react';
import { StackLayout, Text } from '$/ui';
import { Link } from 'react-router-dom';
import { Image } from '@wemogy/reactbase';

const SetOverviewPage: React.FC<ILegoSetCardProps> = ({legoSet}) => {
  return (
      <Link to={`/set/${legoSet.id}`}>
        <StackLayout
            width={25}
            height={30}
            backgroundColor="grey50"
            border={{ custom: 2 }}
            borderColor={legoSet.finished ? 'green500' : 'grey300'}
            borderRadius
        >
          <Image
              uri={legoSet.imageUri}
              alt={legoSet.setName}
              width100
              height={30}
          />
            
          <Text variation14Gray900>
            {legoSet.setName}
          </Text>
        </StackLayout>
      </Link>
  )
};

export default observer(SetOverviewPage);
