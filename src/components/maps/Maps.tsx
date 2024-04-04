import React, {
  ComponentProps,
  forwardRef,
  useCallback,
  useEffect,
  useRef,
} from "react";
import WebView from "react-native-webview";

import { htmlScriptJs } from "./htmlMapScript";
import { Alert, StyleSheet, View } from "react-native";
import { LocateMe } from "../locateMe";
import { getLocation, setCurrentMapLocationAndMarker } from "../../utils";
import { LocationObject } from "expo-location";
import { LatLng } from "../../types";

interface MapsProps extends ComponentProps<typeof View> {
  onGetUserLocation?: (location: LocationObject) => void;
  getUserLocationOnMount?: boolean;
}

export const MAP_INITIAL_STATE: LatLng = {
  latitude: -6.1754083,
  longitude: 106.824584,
};

const Maps = forwardRef((props: MapsProps, ref: any) => {
  const { onGetUserLocation, getUserLocationOnMount } = props;

  const getUserLocation = useCallback(() => {
    getLocation({
      onGranted(location) {
        const { coords } = location;
        onGetUserLocation && onGetUserLocation(location);
        setCurrentMapLocationAndMarker(ref, {
          latitude: coords.latitude,
          longitude: coords.longitude,
        });
      },
      onDenied() {
        Alert.alert(
          "Location Permission Denied",
          "Please enable location permission in order to use this feature",
          [
            {
              text: "OK",
              onPress: () => console.log("Ok Pressed"),
            },
          ]
        );
      },
    });
  }, [onGetUserLocation, ref]);

  useEffect(() => {
    if (getUserLocationOnMount) {
      getUserLocation();
    }
  }, [getUserLocation, getUserLocationOnMount]);

  return (
    <View
      style={StyleSheet.flatten([
        {
          position: "relative",
          flex: 1,
        },
        props.style,
      ])}
    >
      <WebView ref={ref} source={{ html: htmlScriptJs }} testID="mapView" />
      <LocateMe
        style={{
          position: "absolute",
          bottom: 16,
          right: 12,
        }}
        onPress={getUserLocation}
      />
    </View>
  );
});

export default Maps;
