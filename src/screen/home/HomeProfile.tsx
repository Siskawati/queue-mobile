import React from "react";
import { StyleSheet, View } from "react-native";

import { Icon, Text } from "../../components";

const HomeProfile = () => {
  return (
    <View style={styles.container}>
      <Icon
        icon="profile"
        options={{
          style: styles.icon,
        }}
      />
      <View style={styles.text}>
        <Text fontType="section" fontWeight="regular">
          Selamat Datang,
        </Text>
        <Text fontType="section" fontWeight="semibold">
          KELOMPOK 3
        </Text>
      </View>
    </View>
  );
};

export default HomeProfile;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 24,
    marginBottom: 15,
  },
  text: {
    rowGap: 4,
  },
  icon: {
    width: 52,
    height: 52,
  },
});
