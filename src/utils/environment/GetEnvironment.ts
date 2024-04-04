type EnvKey =
  | "apiUrl"
  | "initialHomeScreen"
  | "firebaseApiKey"
  | "firebaseAuthDomain"
  | "firebaseProjectId"
  | "firebaseStorageBucket"
  | "firebaseMessageSenderId"
  | "firebaseAppId"
  | "firebaseMeasurementId";

type EnvPairValue = Record<EnvKey, string | undefined>;

const ENV_LIST: EnvPairValue = {
  apiUrl: process.env["EXPO_PUBLIC_API_URL"],
  initialHomeScreen: process.env["EXPO_PUBLIC_INITIAL_SCREEN"],
  firebaseApiKey: process.env["EXPO_PUBLIC_FIREBASE_API_KEY"],
  firebaseAuthDomain: process.env["EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN"],
  firebaseProjectId: process.env["EXPO_PUBLIC_FIREBASE_PROJECT_ID"],
  firebaseStorageBucket: process.env["EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET"],
  firebaseMessageSenderId:
    process.env["EXPO_PUBLIC_FIREBASE_MESSAGE_SENDER_ID"],
  firebaseAppId: process.env["EXPO_PUBLIC_FIREBASE_APP_ID"],
  firebaseMeasurementId: process.env["EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID"],
};

export function getEnvironmentValue(key: EnvKey) {
  return ENV_LIST[key];
}
