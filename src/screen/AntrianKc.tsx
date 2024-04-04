import React from "react";
import { View, Text } from "react-native";
import { useSelector } from "../redux";

const AntrianKc = () => {
  const { userType } = useSelector((state) => state.userType);
  console.log("userType: ", userType);

  return (
    <View>
      <Text>AntrianKc</Text>
    </View>
  );
};

export default AntrianKc;
