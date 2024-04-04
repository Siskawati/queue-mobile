import { View, Pressable } from "react-native";
import React from "react";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { ArrowLeft, HomeHeaderMobile } from "../svg";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Text } from "../text";

const Header = ({ options, navigation }: NativeStackHeaderProps) => {
  const { top } = useSafeAreaInsets();
  return (
    <View
      style={{
        paddingTop: top + 20,
        paddingBottom: 20,
        paddingLeft: 20,
        paddingRight: 20,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Pressable onPress={() => navigation.goBack()}>
        <ArrowLeft />
      </Pressable>
      {typeof options.headerTitle === "string" && (
        <Text fontType="body" fontWeight="semibold">
          {options.headerTitle}
        </Text>
      )}

      <Pressable onPress={() => navigation.navigate("HomeScreen")}>
        <HomeHeaderMobile />
      </Pressable>
    </View>
  );
};

export default Header;
