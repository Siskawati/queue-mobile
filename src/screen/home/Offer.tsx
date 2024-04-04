import React from "react";
import { StyleSheet, View } from "react-native";
import PagerView from "react-native-pager-view";

import { Offer1, Text } from "../../components";

const Offer = () => {
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <Text
        fontWeight="bold"
        fontType="section"
        style={{
          marginBottom: 12,
        }}
      >
        Promo & Informasi
      </Text>
      <PagerView style={styles.viewPager} initialPage={0}>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Offer1 />
        </View>

        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Offer1 />
        </View>

        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Offer1 />
        </View>
      </PagerView>
      <View style={styles.viewKosong}></View>
    </View>
  );
};

export default Offer;

const styles = StyleSheet.create({
  viewPager: {
    height: 131,
  },
  viewKosong: {
    height: 200,
  },
});
