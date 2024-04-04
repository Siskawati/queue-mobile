import { useNavigation } from "@react-navigation/native";
import React, { ReactElement, useMemo } from "react";
import { View, FlatList, StyleSheet, Pressable } from "react-native";

import { AntrianKc, EWallet, MenuLain, QRIS, Text } from "../../components";

interface AlternativeIconListProps {
  icon: ReactElement;
  text: string;
  onPress: () => void;
}

const AlternativeIcon = () => {
  const navigation = useNavigation(); // Access navigation object

  const alternativeIconList: AlternativeIconListProps[] = useMemo(
    () => [
      {
        icon: <EWallet />,
        text: "E-Wallet",
        onPress: () => null,
      },
      {
        icon: <QRIS />,
        text: "QRIS",
        onPress: () => null,
      },
      {
        icon: <MenuLain />,
        text: "Menu lain",
        onPress: () => navigation.navigate("HomeScreen"),
      },
      {
        icon: <AntrianKc />,
        text: "Antrian KC",
        onPress: () => navigation.navigate("LokasiKCScreen", {
          userType: "ANONYMOUS"
        }),
      },
    ],
    [navigation]
  );

  return (
    <View style={styles.container}>
      <FlatList
        horizontal
        contentContainerStyle={styles.listContainer}
        data={alternativeIconList}
        keyExtractor={(_item, index) => index.toString()}
        renderItem={(item) => (
          <Pressable onPress={item.item.onPress}>
            <View style={styles.iconContainer}>
              {item.item.icon}
              <Text fontWeight="semibold" fontType="caption">
                {item.item.text}
              </Text>
            </View>
          </Pressable>
        )}
      />
    </View>
  );
};

export default AlternativeIcon;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },

  listContainer: {
    columnGap: 24,
  },

  iconContainer: {
    alignItems: "center",
    gap: 4,
    width: 68,
  },

  icon: {
    width: 52,
    height: 52,
  },
});
