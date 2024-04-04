import React, { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";

import { BNI, Logout, LogoutModal, Notification } from "../../components";

const HomeHeader = () => {
  const [logout, setLogout] = useState(false);

  return (
    <View style={styles.container}>
      <LogoutModal
        visible={logout}
        onClose={() => {
          setLogout(false);
        }}
      />
      <BNI />

      <View style={styles.iconContainer}>
        <Notification />

        <Pressable onPress={() => setLogout(true)}>
          <Logout />
        </Pressable>
      </View>
    </View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 27,
  },

  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 4,
  },
});
