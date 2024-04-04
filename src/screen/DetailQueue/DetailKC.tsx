import { View, StyleSheet } from "react-native";

import { Maps, OfficeCard } from "../../components";
import { getColor, setCurrentMapLocationAndMarker } from "../../utils";
import QueueCard from "./QueueCard";
import { ScreenProps } from "../../types";
import React, { useEffect, useRef } from "react";
import { useSelector } from "../../redux";

const DetailKC = ({ route }: ScreenProps<"DetailKC">) => {
  const { branchId, branchName, address, latitude, longitude, distance } =
    route.params;

  const { userType } = useSelector((state) => state.userType);

  const mapRef = useRef<any>();

  useEffect(() => {
    console.log("DetailKC : ", userType);
    setTimeout(() => {
      setCurrentMapLocationAndMarker(mapRef, {
        latitude,
        longitude,
      });
    }, 500);
  }, [latitude, longitude]);

  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 1,
          position: "relative",
        }}
      >
        <OfficeCard
          style={{
            backgroundColor: getColor("white"),
            position: "absolute",
            zIndex: 1,
            left: 20,
            right: 20,
            top: 20,
            borderRadius: 8,
            minHeight: 81,
            paddingHorizontal: 12,
          }}
          branchName={branchName}
          address={address}
          distance={distance}
          latitude={latitude}
          longitude={longitude}
        />
        <Maps ref={mapRef} />
      </View>
      <QueueCard branchId={branchId} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: getColor("white"),
  },
});

export default DetailKC;
