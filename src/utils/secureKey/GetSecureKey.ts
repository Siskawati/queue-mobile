import { setItemAsync, getItemAsync, deleteItemAsync } from "expo-secure-store";

export type SecureKeyType = "authToken" | "queueEmail";

export async function saveSecureKey(key: SecureKeyType, value: string) {
  await setItemAsync(key, value);
}

export async function getValueKey(key: SecureKeyType) {
  const result = await getItemAsync(key);
  return result;
}

export async function deleteSecureKey(key: SecureKeyType) {
  await deleteItemAsync(key);
}
