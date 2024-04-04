import { ImageSourcePropType } from "react-native";

export type ImageKey =
  | "bni"
  | "noInternet"
  | "maintenance"
  | "serverError"
  | "background";

export type ImageListProps = Record<ImageKey, ImageSourcePropType>;
