import { ComponentProps } from "react";

import { TabView } from "react-native-tab-view";

export interface MenuProps<T extends string> {
  key: T;
  title: string;
}

export interface SectionMenuProps<T extends string> {
  menu: MenuProps<T>[];
  indexValue: number;
  onIndexChange: (value: number) => void;
  renderedView: ComponentProps<typeof TabView>["renderScene"];
}
