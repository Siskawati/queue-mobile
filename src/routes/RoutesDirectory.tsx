import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import TabDirectory from "./TabDirectory";
import {
  AntrianKc,
  DetailKC,
  LoginScreen,
  LokasiKCScreen,
  NoInternetScreen,
  OTPScreen,
  QRScreen,
  SuccessScreen,
} from "../screen";
import { RootStackParamList } from "../types";
import { Header } from "../components";
import { getEnvironmentValue } from "../utils";

const Stack = createNativeStackNavigator<RootStackParamList>();

const RoutesDirectory = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        header(props) {
          return <Header {...props} />;
        },
      }}
      initialRouteName={
        getEnvironmentValue("initialHomeScreen") as keyof RootStackParamList
      }
    >
      <Stack.Screen name="LoginScreen" component={LoginScreen} />

      <Stack.Screen name="NoInternetScreen" component={NoInternetScreen} />

      <Stack.Screen name="HomeScreen" component={TabDirectory} />

      <Stack.Screen
        name="AntrianKc"
        component={AntrianKc}
        options={{
          headerShown: true,
          headerTitle: "Antrian KC",
        }}
      />

      <Stack.Screen
        name="QRScreen"
        component={QRScreen}
        options={{
          headerShown: false,
          headerTitle: "QRScreen",
        }}
      />

      <Stack.Screen
        name="LokasiKCScreen"
        options={{
          headerShown: true,
          headerTitle: "Antrian KC",
        }}
        component={LokasiKCScreen}
      />

      <Stack.Screen
        name="DetailKC"
        options={{
          headerShown: true,
          headerTitle: "Antrian KC",
        }}
        component={DetailKC}
      />

      <Stack.Screen name="OTPScreen" component={OTPScreen} />

      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "Antrian KC Berhasil Dibuat",
        }}
        name="SuccessScreen"
        component={SuccessScreen}
      />
    </Stack.Navigator>
  );
};

export default RoutesDirectory;
