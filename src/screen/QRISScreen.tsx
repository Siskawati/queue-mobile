import React from "react";
import { View } from "react-native";
import { getColor } from "../utils";

const QRISScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: getColor("white"),
      }}
    />
  );
};

export default QRISScreen;
