import React, { ComponentProps } from "react";
import { View, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type SafeAreaViewProps = ComponentProps<typeof View>;

const SafeAreaView = ({ style, ...props }: SafeAreaViewProps) => {
  const { bottom, left, right, top } = useSafeAreaInsets();

  return (
    <View
      {...props}
      style={StyleSheet.flatten([
        {
          paddingTop: top,
          paddingBottom: bottom,
          paddingLeft: left,
          paddingRight: right,
        },
        style,
      ])}
    />
  );
};

export default SafeAreaView;
