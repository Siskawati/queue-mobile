import { StyleSheet } from "react-native";
import React, { ComponentProps } from "react";
import { TabBar } from "react-native-tab-view";
import { getColor } from "../../utils";
import { Text } from "../text";

type SectionMenuTabProps = ComponentProps<typeof TabBar>;

const SectionMenuTab = (props: SectionMenuTabProps) => {
  return (
    <TabBar
      indicatorStyle={{
        borderBottomWidth: 2,
        borderBottomColor: getColor("darkOrange"),
      }}
      style={{ backgroundColor: getColor("white") }}
      renderLabel={(scene) => {
        const { focused, route } = scene;
        return (
          <Text
            color={focused ? "darkOrange" : "black"}
            fontWeight="semibold"
            fontType="section"
          >
            {route.title}
          </Text>
        );
      }}
      {...props}
    />
  );
};

export default SectionMenuTab;

const styles = StyleSheet.create({});
