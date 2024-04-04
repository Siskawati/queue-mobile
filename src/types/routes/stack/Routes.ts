import type {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { SuccessScreenParams } from "./SuccessScreen";
import { DetailKcParams } from "./DetailKcScreen";
import { QRScreenParams } from "./QRScreen";
import { OtpScreenParams } from "./OtpScreen";
import { LokasiKCScreenParams } from "./LokasiKcScreen";
import {
  CompositeNavigationProp,
  RouteProp,
  StackNavigationState,
} from "@react-navigation/native";
import { HomeScreenParams } from "./HomeScreen";

export type RootStackParamList = {
  HomeScreen: HomeScreenParams;
  LoginScreen: undefined;
  AntrianKc: undefined;
  SearchManualScreen: undefined;
  NoInternetScreen: undefined;
  ServerErrorScreen: undefined;
  MaintenanceScreen: undefined;
  SuccessScreen: SuccessScreenParams;
  LokasiKCScreen: undefined;
  AntrianBerhasilScreen: undefined;
  QRScreen: QRScreenParams;
  OTPScreen: OtpScreenParams;
  DetailKC: DetailKcParams;
};

export type ScreenRouteProp<T extends keyof RootStackParamList> = RouteProp<
  RootStackParamList,
  T
>;

export type ScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;
