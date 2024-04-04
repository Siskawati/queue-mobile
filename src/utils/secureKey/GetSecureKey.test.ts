import {
  setItemAsync as nativeSetItemAsync,
  getItemAsync as nativeGetItemAsync,
} from "expo-secure-store";

import { getValueKey, saveSecureKey } from "./GetSecureKey";

jest.mock("expo-secure-store", () => ({
  setItemAsync: jest.fn(),
  getItemAsync: jest.fn().mockReturnValue("test value"),
}));

describe("get secure key function", () => {
  test("function should store my key", async () => {
    await saveSecureKey("authToken", "testing token");
    expect(nativeSetItemAsync).toHaveBeenCalledWith(
      "authToken",
      "testing token"
    );
  });

  test("function should return my key", async () => {
    const token = await getValueKey("authToken");
    expect(token).toBe("test value");
    expect(nativeGetItemAsync).toHaveBeenCalled();
  });
});
