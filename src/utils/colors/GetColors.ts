export type ColorKey =
  | "darkOrange"
  | "lightOrange"
  | "darkTeal"
  | "lightTeal"
  | "black"
  | "grey500"
  | "grey400"
  | "grey300"
  | "grey200"
  | "grey100"
  | "white"
  | "errorMessage";

export type ColorType = Record<ColorKey, string>;

export const COLOR_COLLECTION: ColorType = {
  black: "#262626",
  darkOrange: "#FF6600",
  lightOrange: "#FFEDE0",
  darkTeal: "#006677",
  lightTeal: "#1BC1CF",
  white: "#FFFFFF",
  grey100: "#FFFFFF",
  grey200: "#F0F0F0",
  grey300: "#D9D9D9",
  grey400: "#BFBFBF",
  grey500: "#8C8C8C",
  errorMessage: "#C80A2F",
};

export function getColor(key: ColorKey) {
  return COLOR_COLLECTION[key];
}
