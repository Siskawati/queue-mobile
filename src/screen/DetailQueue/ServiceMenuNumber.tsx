import { StyleSheet, View } from "react-native";
import React from "react";
import { Text } from "../../components";
import { ColorKey, getColor } from "../../utils";

interface ServiceMenuNumberProps {
  description: string;
  value: number;
  backgroundColor: ColorKey;
}

const ServiceMenuNumber = ({
  description,
  value,
  backgroundColor,
}: ServiceMenuNumberProps) => {
  return (
    <View
      style={StyleSheet.flatten([
        styles.container,
        {
          backgroundColor: getColor(backgroundColor),
        },
      ])}
    >
      <Text
        fontWeight="semibold"
        fontType="nomorAntrian"
        style={StyleSheet.flatten([styles.value, styles.text])}
      >
        {value}
      </Text>
      <Text fontType="caption" fontWeight="semibold" style={styles.text}>
        {description}
      </Text>
    </View>
  );
};

export default ServiceMenuNumber;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    rowGap: 4,
    borderRadius: 10,
    width: 130,
    height: 97,
  },

  value: {
    // fontSize: 46,
  },

  text: {
    textAlign: "center",
  },
});
