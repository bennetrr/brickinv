import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { RenderIf } from '@wemogy/reactbase';
import { observer } from 'mobx-react';
import { useParams } from 'react-router-dom';
import { useAppStore } from '../../../../../domain';
import { Icon, StackLayout, Text } from '../../../../atoms';
import IPartOverviewPageProps from './IPartOverviewPageProps';

const PartOverviewPage: React.FC<IPartOverviewPageProps> = () => {
  const { setStore } = useAppStore();
  const params = useParams();
  const setId = params.setId!;
  const [currentIndex, setCurrentIndex] = useState(0);

  const set = setStore.getSet(setId);

  const part = useMemo(() => {
    if (!set) {
      return undefined;
    }

    return set.partsSorted[currentIndex];
  }, [set, currentIndex, set?.partsSorted, set?.partsSorted.length]);

  const handlePreviousPress = useCallback(() => {
    if (currentIndex <= 0) {
      return;
    }

    setCurrentIndex(currentIndex - 1);
  }, [currentIndex]);

  const handleNextPress = useCallback(() => {
    if (!set || currentIndex >= set.parts.length) {
      return;
    }

    setCurrentIndex(currentIndex + 1);
  }, [currentIndex, set]);

  const handleDecrementPress = useCallback(() => {
    if (!part || !set || part.presentCount <= 0) {
      return;
    }

    part.setPresentCount(part.presentCount - 1);
    setStore.updatePart(set, part);
  }, [part, set]);

  const handleIncrementPress = useCallback(() => {
    if (!part || !set || part.presentCount >= part.totalCount) {
      return;
    }

    part.setPresentCount(part.presentCount + 1);
    setStore.updatePart(set, part);
  }, [part, set]);

  const handleCompletePress = useCallback(() => {
    if (!part || !set) {
      return;
    }

    part.setPresentCount(part.totalCount);
    setStore.updatePart(set, part);
  }, [part, set]);

  useEffect(() => {
    if (!set) {
      return;
    }

    setStore.queryParts(setId);
  }, [set]);

  if (!set) {
    throw 404;
  }

  if (set.parts.length === 0 || !part) {
    return <>Loading</>;  // TODO: Show loading indicator
  }

  // TODO: Add animation when a part is completed
  return (
    <StackLayout height={{ custom: 'calc(100dvh - 64px)' }} hCenter vCenter key={part.id}>
      <StackLayout
        orientation="horizontal"
        width={50}
        gap={3}
        margin={2}
        padding={2}
        border={{ custom: 1 }}
        borderColor="grey300"
        borderRadius={0.75}
      >
        <StackLayout
          width={5}
          vCenter
          hCenter
          onPress={handlePreviousPress}
        >
          <RenderIf condition={currentIndex > 0}>
            <Icon chevronLeft variation3Grey500/>
          </RenderIf>
        </StackLayout>

        <StackLayout stretch>
          <img
            src={part.imageUri}
            alt="No image"
          />

          <Text variation12Gray500Medium>{part.partId}</Text>
          <Text>{part.partName}</Text>
          <Text variation14Gray500>{part.partColor}</Text>
          <Text variation14Gray500>{`Total: ${part.totalCount}`}</Text>

          <StackLayout
            orientation="horizontal"
          >
            <StackLayout
              width={5}
              height={5}
              hCenter
              vCenter
              border={{ custom: 1 }}
              borderColor="grey300"
              borderRadiusLeft={0.75}
              onPress={part.presentCount > 0 ? handleDecrementPress : undefined}
            >
              <Icon minus variationKey={part.presentCount > 0 ? 'variation3Grey500' : 'variation3GreyLight'}/>
            </StackLayout>

            <StackLayout
              width={5}
              height={5}
              hCenter
              vCenter
              borderTopBottom={{ custom: 1 }}
              borderColor="grey300"
            >
              <Text>{part.presentCount.toString()}</Text>
            </StackLayout>

            <StackLayout
              width={5}
              height={5}
              hCenter
              vCenter
              onPress={part.presentCount < part.totalCount ? handleIncrementPress : undefined}
              border={{ custom: 1 }}
              borderColor="grey300"
              borderRadiusRight={0.75}
            >
              <Icon plus
                    variationKey={part.presentCount < part.totalCount ? 'variation3Grey500' : 'variation3GreyLight'}/>
            </StackLayout>

            <StackLayout
              width={5}
              height={5}
              hCenter
              vCenter
              marginLeft={5}
              border={{ custom: 1 }}
              borderColor="grey300"
              borderRadius={0.75}
              onPress={part.presentCount < part.totalCount ? handleCompletePress : undefined}
            >
              <Icon check
                    variationKey={part.presentCount < part.totalCount ? 'variation3Grey500' : 'variation3GreyLight'}/>
            </StackLayout>
          </StackLayout>
        </StackLayout>

        <StackLayout
          width={5}
          vCenter
          hCenter
          onPress={handleNextPress}
        >
          <RenderIf condition={currentIndex < set.parts.length}>
            <Icon chevronRight variation3Grey500/>
          </RenderIf>
        </StackLayout>
      </StackLayout>
    </StackLayout>
  );
};

export default observer(PartOverviewPage);
