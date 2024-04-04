import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getEnvironmentValue } from "../utils";

const firebaseConfig = {
  apiKey: getEnvironmentValue("firebaseApiKey"),
  authDomain: getEnvironmentValue("firebaseAuthDomain"),
  projectId: getEnvironmentValue("firebaseProjectId"),
  storageBucket: getEnvironmentValue("firebaseStorageBucket"),
  messagingSenderId: getEnvironmentValue("firebaseMessageSenderId"),
  appId: getEnvironmentValue("firebaseAppId"),
  measurementId: getEnvironmentValue("firebaseMeasurementId"),
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
