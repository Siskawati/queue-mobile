import React, { useState, useCallback, useRef } from "react";
import { View, StyleSheet, ActivityIndicator, Dimensions } from "react-native";

import { Maps, Button, MAP_INITIAL_STATE } from "../../components";

import { getColor, setWaypointRoute } from "../../utils";
import { getData } from "../../services";
import ListLocations from "./ListLocation";
import { LocationObject } from "expo-location";
import { LatLng } from "../../types";
import { CekNomorAntrian } from "../../components/modal/cekNomorAntrian";
import { useSelector } from "../../redux";

interface Branch {
  branchId: number;
  branchName: string;
  address: string;
  distance: number;
  latitude: number;
  longitude: number;
}

interface LocationRequestParams {
  lat: number;
  lon: number;
  size: number;
}

const LokasiKCScreen: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Branch[]>([]);
  const [isListExpanded, setIsListExpanded] = useState(false);
  const [cekNomorAntrian, setCekNomorAntrian] = useState(false);

  const { userType } = useSelector((state) => state.userType);

  const [userCoordinate, setUserCoordinate] =
    useState<LatLng>(MAP_INITIAL_STATE);

  const handleLocateMe = useCallback((location: LocationObject) => {
    const { coords } = location;
    setLoading(true);
    getData<LocationRequestParams, Branch[]>(
      "/queue-api/v1/branch-data/get-branches-data",
      {
        size: 20,
        lat: coords.latitude,
        lon: coords.longitude,
      },
      {
        onSuccess(data) {
          setData(data.data);
          setUserCoordinate({
            latitude: coords.latitude,
            longitude: coords.longitude,
          });
        },
        onError(error) {},
        onFinally() {
          setLoading(false);
        },
      }
    );
  }, []);

  const handleSearchBarClick = () => {
    setIsListExpanded(true);
  };

  const handleBackPress = () => {
    setIsListExpanded(false);
  };

  const mapRef = useRef<any>();

  return (
    <View style={styles.container}>
      <CekNomorAntrian
        visible={cekNomorAntrian}
        onClose={() => {
          setCekNomorAntrian(false);
        }}
      />
      <View style={styles.map}>
        <Maps
          ref={mapRef}
          getUserLocationOnMount
          onGetUserLocation={handleLocateMe}
        />

        {userType === "ANONYMOUS" && (
          <Button
            textOptions={{
              color: "lightTeal",
              fontType: "caption",
              fontWeight: "medium",
            }}
            onPress={() => setCekNomorAntrian(true)}
            style={styles.button}
          >
            Sudah Punya Nomor Antrian?
          </Button>
        )}
      </View>

      {loading ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
          }}
        >
          <ActivityIndicator animating />
        </View>
      ) : (
        <ListLocations
          onIconPress={(latitude, longitude) => {
            setWaypointRoute(mapRef, {
              from: {
                latitude: userCoordinate?.latitude,
                longitude: userCoordinate?.longitude,
              },
              to: { latitude, longitude },
              showRoutes: true,
            });
          }}
          data={data}
          isListExpanded={isListExpanded}
          onSearchBarClick={handleSearchBarClick}
          onBackPress={handleBackPress}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: Dimensions.get("screen").height / 2,
  },
  button: {
    position: "absolute",
    backgroundColor: getColor("white"),
    bottom: 16,
    left: 12,
    borderWidth: 1,
    borderColor: getColor("grey300"),
  },
});
export default LokasiKCScreen;
