import React from "react";
import { useWindowDimensions } from "react-native";
import { TabView } from "react-native-tab-view";
import { SectionMenuProps } from "../../types";
import SectionMenuTab from "./SectionMenuTab";

export default function SectionMenu<T extends string>({
  menu,
  renderedView,
  indexValue,
  onIndexChange,
}: SectionMenuProps<T>) {
  const layout = useWindowDimensions();

  return (
    <TabView
      renderTabBar={SectionMenuTab}
      navigationState={{ index: indexValue, routes: menu }}
      renderScene={renderedView}
      onIndexChange={onIndexChange}
      initialLayout={{ width: layout.width }}
    />
  );
}
