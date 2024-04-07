import { Style } from '@dicebear/core';

export default interface IImageUploadProps {
  imageDataUrl: string;
  setImageDataUrl: (value: string) => void;
  automationIdPrefix: string;
  dimensions: number;
  dicebearSeed: string;
  dicebearModel: Style<any>;
}
