import React, { ComponentProps } from "react";
import { Text as NativeText, StyleSheet } from "react-native";

import {
  FONT_TYPE_LIST,
  FONT_WEIGHT_LIST,
  FontType,
  FontWeightKey,
} from "../../fonts";
import { ColorKey, getColor } from "../../utils";

export type NativeTextProps = ComponentProps<typeof NativeText>;

export interface TextProps extends NativeTextProps {
  fontWeight?: FontWeightKey;
  fontType?: FontType;
  color?: ColorKey;
}

const Text = ({
  style,
  fontType = "body",
  fontWeight = "regular",
  color = "black",
  ...props
}: TextProps) => {
  return (
    <NativeText
      {...props}
      style={StyleSheet.flatten([
        {
          fontFamily: FONT_WEIGHT_LIST[fontWeight],
          fontSize: FONT_TYPE_LIST[fontType],
          color: getColor(color),
        },
        style,
      ])}
    />
  );
};

export default Text;
