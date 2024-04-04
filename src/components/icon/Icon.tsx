import React, { ComponentProps } from "react";
import { Image, ImageSourcePropType, StyleSheet } from "react-native";

export type IconKey =
  | "qris"
  | "faceId"
  | "boldWallet"
  | "menuLain"
  | "headphone"
  | "danger"
  | "close"
  | "home"
  | "history"
  | "settings"
  | "favourite"
  | "homeQris"
  | "profile"
  | "back"
  | "search"
  | "direction"
  | "indikatorSepi";
  

type IconListProps = Record<IconKey, ImageSourcePropType>;

const ICON_LIST: IconListProps = {
  qris: require("../../../assets/icons/icon_ppob_qris.png"),
  faceId: require("../../../assets/icons/icon_faceid.png"),
  boldWallet: require("../../../assets/icons/icon_ppob_ewallet.png"),
  menuLain: require("../../../assets/icons/icon_ppob_menulain.png"),
  headphone: require("../../../assets/icons/icon_headphone.png"),
  danger: require("../../../assets/icons/icon_danger.png"),
  close: require("../../../assets/icons/icon_close.png"),
  home: require("../../../assets/icons/icon_home.png"),
  history: require("../../../assets/icons/icon_navbar_riwayat.png"),
  settings: require("../../../assets/icons/icon_navbar_pengaturan.png"),
  favourite: require("../../../assets/icons/icon_navbar_favorit.png"),
  homeQris: require("../../../assets/icons/icon_qris.png"),
  profile: require("../../../assets/icons/icon_profil.png"),
  back: require("../../../assets/icons/icon_back.png"),
  search: require("../../../assets/icons/icon_search_before.png"),
  direction: require("../../../assets/icons/icon_arrow_direction.png"),
  indikatorSepi:require("../../../assets/icons/icon_crowded_sepi.png")
};

type IconNativeProps = Exclude<ComponentProps<typeof Image>, "source">;

interface IconProps {
  icon: IconKey;
  options?: IconNativeProps;
}

const Icon = ({ icon, options }: IconProps) => {
  return (
    <Image
      {...options}
      testID="icon"
      style={StyleSheet.flatten([styles.icon, options?.style])}
      source={ICON_LIST[icon]}
    />
  );
};

export default Icon;

const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
  },
});
