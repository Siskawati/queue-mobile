export type FontType =
  | "headerMobile"
  | "body"
  | "section"
  | "caption"
  | "headerWebSmall"
  | "headerWebMedium"
  | "headerWebBig"
  | "nomorAntrian"
  | "balance"
  | "nomorAntrian"

export type FontWeightKey = "bold" | "regular" | "medium" | "semibold";

export type FontWeightFile =
  | "Montserrat_700Bold"
  | "Montserrat_400Regular"
  | "Montserrat_500Medium"
  | "Montserrat_600SemiBold";

type FontTypeListProps = Record<FontType, number>;

type FontWeightListProps = Record<FontWeightKey, FontWeightFile>;

export const FONT_WEIGHT_LIST: FontWeightListProps = {
  bold: "Montserrat_700Bold",
  medium: "Montserrat_500Medium",
  regular: "Montserrat_400Regular",
  semibold: "Montserrat_600SemiBold",
};

export const FONT_TYPE_LIST: FontTypeListProps = {
  body: 16,
  section: 14,
  caption: 12,
  headerMobile: 16,
  headerWebSmall: 16,
  headerWebMedium: 24,
  headerWebBig: 32,
  nomorAntrian: 36,
  balance: 18,
};
