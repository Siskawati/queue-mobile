import { Pressable, StyleSheet, View } from "react-native";
import React from "react";
import { Text } from "../../components";
import { MenuListProps } from "./HomeScreenTypes";

const HomeScreenIcon = ({ element, onClick, text }: MenuListProps) => {
  return (
    <Pressable style={styles.container} onPress={onClick}>
      <View style={styles.element}>{element}</View>

      <Text style={styles.text} fontType="caption" fontWeight="medium">
        {text}
      </Text>
    </Pressable>
  );
};

export default HomeScreenIcon;

const styles = StyleSheet.create({
  container: {
    flex: 1 / 4,
  },

  element: {
    alignItems: "center",
    marginBottom: 2,
  },

  text: {
    textAlign: "center",
  },
});
