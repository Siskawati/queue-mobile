import {
  Pressable,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";
import React from "react";
import { Direction } from "../svg";
import { Text } from "../text";

interface OfficeCardProps {
  branchName: string;
  address: string;
  distance: number;
  latitude: number;
  longitude: number;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
  onIconPress?: (latitude: number, longitude: number) => void;
}

const OfficeCard = ({
  address,
  distance,
  branchName,
  latitude,
  longitude,
  style,
  onPress,
  onIconPress,
}: OfficeCardProps) => {
  return (
    <View style={StyleSheet.flatten([styles.container, style])}>
      <Pressable style={styles.addressContainer} onPress={onPress}>
        <Text fontType="section" fontWeight="semibold">
          {branchName}
        </Text>
        <Text fontType="caption" fontWeight="regular" color="grey500">
          {address}
        </Text>
      </Pressable>

      <Pressable
        onPress={() => onIconPress && onIconPress(latitude, longitude)}
      >
        <View style={styles.directionContainer}>
          <Direction />
          <Text fontType="caption" fontWeight="medium">
            {distance} Km
          </Text>
        </View>
      </Pressable>
    </View>
  );
};

export default OfficeCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    gap: 8,
  },

  addressContainer: {
    flex: 4,
    rowGap: 6,
  },

  directionContainer: {
    display: "flex",

    alignItems: "center",
    gap: 4,
  },
});
