import React, { ComponentProps } from "react";
import { Image as ReactNativeImage } from "react-native";
import { ImageKey } from "../../types";
import { IMAGE_LIST } from "../../const";

type ImageNativeProps = Exclude<
  ComponentProps<typeof ReactNativeImage>,
  "source"
>;

interface ImageProps {
  image: ImageKey;
  options?: ImageNativeProps;
}

const Image = ({ image, options }: ImageProps) => {
  return (
    <ReactNativeImage {...options} testID="image" source={IMAGE_LIST[image]} />
  );
};

export default Image;
