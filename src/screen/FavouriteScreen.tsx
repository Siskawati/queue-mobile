import React from "react";
import { View } from "react-native";

import { getColor } from "../utils";

const FavouriteScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: getColor("white"),
      }}
    />
  );
};

export default FavouriteScreen;
