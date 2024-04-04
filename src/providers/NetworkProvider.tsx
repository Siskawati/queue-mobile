import NetInfo from "@react-native-community/netinfo";
import { useNavigation } from "@react-navigation/native";
import React, { ReactNode, useEffect } from "react";
import { View, StyleSheet } from "react-native";

interface NetworkProviderProps {
  children: ReactNode;
}

const NetworkProvider = ({ children }: NetworkProviderProps) => {
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      if (!state.isConnected) {
        navigation.navigate("NoInternetScreen");
      }
    });

    return () => unsubscribe();
  }, [navigation]);

  return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default NetworkProvider;
