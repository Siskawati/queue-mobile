import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";

import {
  Barcode,
  Favorit,
  LogoQRIS,
  NavbarHome,
  NavbarRiwayat,
  Setting,
  Text,
} from "../components";
import {
  FavouriteScreen,
  HistoryScreen,
  HomeScreen,
  QRISScreen,
  SettingsScreen,
} from "../screen";
import { TabStackParamList } from "../types";
import { getColor } from "../utils";

const Tab = createBottomTabNavigator<TabStackParamList>();

const TabDirectory = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarLabel(props) {
          return (
            <Text fontType="caption" fontWeight="medium">
              {props.children}
            </Text>
          );
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarActiveTintColor: getColor("darkOrange"),
          tabBarInactiveTintColor: getColor("grey500"),
          tabBarIcon() {
            return <NavbarHome />;
          },
          tabBarLabel: "Home",
        }}
      />
      <Tab.Screen
        name="History"
        component={HistoryScreen}
        options={{
          tabBarActiveTintColor: getColor("darkOrange"),
          tabBarInactiveTintColor: getColor("grey500"),
          tabBarIcon() {
            return <NavbarRiwayat />;
          },
          tabBarLabel: "History",
        }}
      />

      <Tab.Screen
        name="QRIS"
        component={QRISScreen}
        options={{
          tabBarIconStyle: {
            bottom: 20,
            marginBottom: 11,
          },
          tabBarLabel() {
            return <LogoQRIS />;
          },
          tabBarIcon() {
            return <Barcode />;
          },
        }}
      />

      <Tab.Screen
        name="Favourite"
        component={FavouriteScreen}
        options={{
          tabBarActiveTintColor: getColor("darkOrange"),
          tabBarInactiveTintColor: getColor("grey500"),
          tabBarIcon() {
            return <Favorit />;
          },
          tabBarLabel: "Favorite",
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarActiveTintColor: getColor("darkOrange"),
          tabBarInactiveTintColor: getColor("grey500"),
          tabBarIcon() {
            return <Setting />;
          },
          tabBarLabel: "Setting",
        }}
      />
    </Tab.Navigator>
  );
};

export default TabDirectory;
