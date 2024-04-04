import { getLocation } from "./GetLocation";

jest.mock("expo-location", () => ({
  requestForegroundPermissionsAsync: jest
    .fn()
    .mockResolvedValueOnce({
      status: "granted",
    })
    .mockResolvedValueOnce({
      stateus: "notGranted",
    }),
  getCurrentPositionAsync: jest.fn().mockResolvedValue({
    latitude: 40.7128,
    longitude: -74.006,
  }),
}));

describe("first", () => {
  test("location function onGranted should be called", async () => {
    const onDeniedMock = jest.fn();
    const onGrantedMock = jest.fn();

    await getLocation({
      onDenied: onDeniedMock,
      onGranted: onGrantedMock,
    });

    expect(onGrantedMock).toHaveBeenCalled();
  });

  test("location function onDenied should be called", async () => {
    const onDeniedMock = jest.fn();
    const onGrantedMock = jest.fn();

    await getLocation({
      onDenied: onDeniedMock,
      onGranted: onGrantedMock,
    });

    expect(onDeniedMock).toHaveBeenCalled();
  });
});
