import NetInfo from "@react-native-community/netinfo";
import { useNavigation } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { RefreshControl, ScrollView, StyleSheet, View } from "react-native";

import { NoInternet, Text } from "../../../components";
import React from "react";

const NoInternetScreen = () => {
  const navigation = useNavigation();

  const [refresh, setRefresh] = useState(false);

  const getNetworkStatus = useCallback(() => {
    setRefresh(true);
    NetInfo.fetch()
      .then((state) => {
        if (state.isInternetReachable) {
          navigation.goBack();
        }
      })
      .finally(() => {
        setRefresh(false);
      });
  }, [navigation]);

  const onRefresh = useCallback(() => {
    getNetworkStatus();
  }, [getNetworkStatus]);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
      }
      contentContainerStyle={styles.container}
    >
      <NoInternet />
      <View style={styles.text}>
        <Text fontType="body" fontWeight="semibold">
          Tidak Ada Internet
        </Text>
        <Text fontType="caption" fontWeight="regular">
          Tarik ke bawah untuk refresh
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    rowGap: 50,
  },
  text: {
    alignItems: "center",
    rowGap: 8,
  },
});

export default NoInternetScreen;
