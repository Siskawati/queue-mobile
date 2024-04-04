import {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
  LocationObject,
} from "expo-location";

interface GetLocationProps {
  onDenied: () => void;
  onGranted: (location: LocationObject) => void;
}

export async function getLocation({ onDenied, onGranted }: GetLocationProps) {
  const { status } = await requestForegroundPermissionsAsync();

  if (status !== "granted") {
    onDenied();

    return;
  }

  const location = await getCurrentPositionAsync({ accuracy: 6 });
  onGranted(location);
}
