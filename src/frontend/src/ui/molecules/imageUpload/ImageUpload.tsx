import React, { useEffect, useMemo, useState } from 'react';
import IImageUploadProps from './IImageUploadProps.ts';
import { Button, Icon, StackLayout, Text } from '../../atoms';
import ReactImageUploading from 'react-images-uploading';
import { ImageType as IUploadImage } from 'react-images-uploading/dist/typings';
import { styled } from '@wemogy/reactbase';
import { createAvatar } from '@dicebear/core';

interface IImageContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  $isDragging: boolean;
  $dimensions: number;
}

const ImageContainer: React.FC<IImageContainerProps> = styled.div<IImageContainerProps>`
  width: ${(props: IImageContainerProps) => props.$dimensions * 8}px;
  height: ${(props: IImageContainerProps) => props.$dimensions * 8}px;
  position: relative;
  overflow: hidden;

  border-radius: 50%;
  cursor: pointer;
  user-select: none;

  &:hover > div {
    opacity: 1;
  }

  ${(props: IImageContainerProps) => props.$isDragging && '& > div { opacity: 1; }'}
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ImageUpload: React.FC<IImageUploadProps> = ({
                                                    imageDataUrl,
                                                    setImageDataUrl,
                                                    automationIdPrefix,
                                                    dimensions,
                                                    dicebearModel,
                                                    dicebearSeed
}) => {
  const [imageList, setImageList] = useState<IUploadImage[]>([]);

  const avatar = useMemo(() => {
    return createAvatar(dicebearModel, {
      seed: dicebearSeed
    });
  }, [dicebearModel, dicebearSeed]);

  useEffect(() => {
    setImageDataUrl(imageList[0]?.dataURL || avatar.toDataUriSync())
  }, [imageList, imageList.length, avatar]);

  return (
    <ReactImageUploading
      value={imageList}
      onChange={value => setImageList(value)}
      acceptType={['jpg', 'png']}
    >
      {({ onImageUpload, onImageRemoveAll, isDragging, dragProps }) => (
        <StackLayout hCenter gap>
          <ImageContainer
            $isDragging={isDragging}
            $dimensions={dimensions}
            onClick={onImageUpload}
            data-automation-id={`${automationIdPrefix}-input-image`}
            {...dragProps}
          >
            <Image
              src={imageDataUrl}
              alt="Profile image"
            />

            <StackLayout
              width100
              height100
              positionAbsoluteFill
              hCenter
              vCenter
              backgroundColor={{ custom: 'rgba(0, 0, 0, .5)' }}
              opacity={0}
              customStyle={{ transition: 'opacity ease-in-out .25s' }}
            >
              <Icon arrowUpTray variation5White customStyle={{ pointerEvents: 'none' }}/>

              <Text
                variation14WhiteMedium
                textAlign="center"
                customStyle={{ pointerEvents: 'none' }}
              >
                { isDragging ? 'Drag image here' : 'Click to choose image' }
              </Text>
            </StackLayout>
          </ImageContainer>

          <Text variation14Grey700Medium>
            Drag a file onto the image or click the image to upload a file.
          </Text>

          <Button borderless onPress={onImageRemoveAll}>
            Reset the image
          </Button>
        </StackLayout>
      )}
    </ReactImageUploading>
  )
}

export default ImageUpload;
