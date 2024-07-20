import React from 'react';
// import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';
// import { StackLayout, Text } from '../../../../atoms';
import ISetCardProps from './ISetCardProps';

const SetCard: React.FC<ISetCardProps> = ({ set }) => {
  // return (
  //   <Link to={`/sets/${set.id}`}>
  //     <StackLayout
  //       width={30}
  //       height={40}
  //       backgroundColor="white"
  //       border={{ custom: 2 }}
  //       borderColor={set.finished ? 'green500' : 'grey300'}
  //       borderRadius
  //     >
  //       <img
  //         src={set.imageUri}
  //         alt={set.setName}
  //         style={{ borderTopLeftRadius: 'inherit', borderTopRightRadius: 'inherit', marginTop: 'auto' }}
  //       />
  //
  //       <StackLayout
  //         padding={0.5}
  //         borderTop={{ custom: 1 }}
  //         borderColor="grey300"
  //         backgroundColor="grey50"
  //         borderRadiusBottomLeft={{ custom: 'inherit' }}
  //         borderRadiusBottomRight={{ custom: 'inherit' }}
  //       >
  //         <Text variation12Gray500Medium>{set.setId}</Text>
  //         <Text>{set.setName}</Text>
  //       </StackLayout>
  //     </StackLayout>
  //   </Link>
  // );
  return (
    <span>Not available</span>
  )
};

export default observer(SetCard);
