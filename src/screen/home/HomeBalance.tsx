import React from "react";
import { StyleSheet, View } from "react-native";

import { ArrowDown, Copy, EyeClosed, Text } from "../../components";
import { getColor } from "../../utils";

const HomeBalance = () => {
  return (
    <View style={styles.container}>
      <View>
        <View style={styles.price}>
          <Text fontType="balance" fontWeight="medium" color="white">
            Rp 1.000.000
          </Text>
          <EyeClosed />
        </View>

        <View style={styles.accountNumber}>
          <Text fontWeight="semibold" fontType="body" color="white">
            1810348336
          </Text>
          <Copy />
        </View>

        <Text fontWeight="bold" fontType="caption" color="white">
          TAPLUS PEGAWAI BNI
        </Text>
      </View>

      <ArrowDown />
    </View>
  );
};

export default HomeBalance;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: getColor("darkTeal"),
    padding: 16,
    borderRadius: 12,
    justifyContent: "space-between",
  },

  price: {
    flexDirection: "row",
    columnGap: 8,
  },

  accountNumber: {
    flexDirection: "row",
    marginTop: 16.5,
    marginBottom: 4,
    columnGap: 10,
  },
});
