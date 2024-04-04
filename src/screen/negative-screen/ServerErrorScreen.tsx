import { StyleSheet, View } from "react-native";

import { ServerError, Text } from "../../components";
import React from "react";

const ServerErrorScreen = () => {
  return (
    <View style={styles.container}>
      <ServerError />
      <View style={styles.text}>
        <Text fontType="body" fontWeight="semibold">
          Server Sedang Dalam Perbaikan
        </Text>
        <Text fontType="caption" fontWeight="regular">
          Silahkan Refresh Halaman
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    gap: 50,
    flex: 1,
  },
  text: {
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
});
export default ServerErrorScreen;
