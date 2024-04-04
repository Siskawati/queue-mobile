import React from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Danger, Icon, Text } from "../../components";

interface CautionProps {
  onClose: () => void;
}

const Caution = ({ onClose }: CautionProps) => {
  const { top } = useSafeAreaInsets();
  return (
    <View
      style={StyleSheet.flatten([
        styles.container,
        {
          paddingTop: top,
        },
      ])}
    >
      <Danger />

      <View style={styles.textContainer}>
        <Text color="white" style={styles.title} fontWeight="semibold">
          Waspada
        </Text>
        <Text color="white" fontType="caption" style={styles.description}>
          Jangan berikan data pribadi seperti {""}
          <Text fontWeight="bold" fontType="caption" color="white">
            Kode OTP, PIN, dan Password
          </Text>
          {""}
          kepada siapapun termasuk pihak BNI. Bila curiga akan terjadinya
          penipuan, segera hubungi BNI Call 1500046 untuk melaporkan
        </Text>
      </View>
      <Pressable onPress={onClose}>
        <Icon icon="close" />
      </Pressable>
    </View>
  );
};

export default Caution;

const styles = StyleSheet.create({
  container: {
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    backgroundColor: "#014558",
    paddingBottom: 12,
    paddingHorizontal: 20,
    flexDirection: "row",
    columnGap: 24,
  },

  textContainer: {
    flex: 1,
  },

  title: {
    marginBottom: 15.5,
  },

  description: {
    textAlign: "justify",
  },
});
