import React, { ComponentProps } from "react";
import { Pressable } from "react-native";

import { PrecisionLocation } from "../svg";

export type LocateMeProps = ComponentProps<typeof Pressable>;

const LocateMe = (props: LocateMeProps) => {
  return (
    <Pressable {...props}>
      <PrecisionLocation />
    </Pressable>
  );
};

export default LocateMe;
