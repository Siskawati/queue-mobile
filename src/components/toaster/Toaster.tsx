import React, { useState, useEffect } from "react";
import { View, StyleSheet, Animated, Pressable } from "react-native";

import { getColor } from "../../utils";
import CloseBlue from "../svg/CloseBlue";
import Info from "../svg/Info";
import { Text } from "../text";

interface ToasterProps {
  message: string;
  duration?: number;
  onClose: () => void;
}

const Toaster: React.FC<ToasterProps> = ({
  message,
  duration = 3000,
  onClose,
}) => {
  const [fadeAnim] = useState(new Animated.Value(0)); // Initial value for opacity: 0

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();

    setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => onClose());
    }, duration - 1000);
  }, []);

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <Info />
      <Text style={styles.text} fontType="section" fontWeight="semibold">
        {message}
      </Text>

      <Pressable onPress={onClose}>
        <CloseBlue />
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: 350,
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F6FDFE",
    paddingVertical: 8,
    paddingHorizontal: 16,
    flexShrink: 0,
    borderRadius: 6,
    marginHorizontal: 20,
    gap: 12,
    borderLeftWidth: 6,
    borderLeftColor: getColor("darkTeal"),
    position: "absolute", // Position the toaster absolutely
    bottom: 60, // Adjust the top position as needed to place it above the header
    zIndex: 999, // Ensure the toaster appears above other content

    // For iOS
    shadowColor: "#7A7A7A",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.27,
    shadowRadius: 10,
    // For Android
    elevation: 5,
  },
  text: {
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 4,
    flex: 1,
  },
});

export default Toaster;
