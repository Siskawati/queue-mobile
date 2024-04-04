import ExpoCheckbox from "expo-checkbox";
import React from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";

import { getColor } from "../../utils";
import { Text } from "../text";

interface CheckboxProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
  size?: number;
  text: string;
  style?: StyleProp<ViewStyle>;
}

const Checkbox = ({
  text,
  size = 25,
  onValueChange,
  value,
  style,
}: CheckboxProps) => {
  return (
    <View style={StyleSheet.flatten([styles.container, style])}>
      <ExpoCheckbox
        testID="checkbox"
        style={StyleSheet.flatten([
          styles.checkbox,
          {
            width: size,
            height: size,
          },
        ])}
        value={value}
        color={value ? getColor("lightTeal") : getColor("grey300")}
        onValueChange={onValueChange}
      />

      <Text fontWeight="medium" fontType="caption">
        {text}
      </Text>
    </View>
  );
};

export default Checkbox;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 8,
  },
  checkbox: {
    borderRadius: 10,
  },
});
