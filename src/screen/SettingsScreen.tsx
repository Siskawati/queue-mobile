import React from "react";
import { View } from "react-native";

import { getColor } from "../utils";

const SettingsScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: getColor("white"),
      }}
    />
  );
};

export default SettingsScreen;
