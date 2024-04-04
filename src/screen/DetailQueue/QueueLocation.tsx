import React from "react";
import { View, StyleSheet } from "react-native";

import { Text, IndicatorCukupRamai } from "../../components";

interface BranchLocationProps {
  branchName: string;
  address: string;
}

const QueueLocation = ({ branchName, address }: BranchLocationProps) => {
  return (
    <View style={styles.innerContainer}>
      <Text>{branchName}</Text>
      <View>
        <IndicatorCukupRamai />
      </View>
    </View>
  );
};

export default QueueLocation;

const styles = StyleSheet.create({
  innerContainer: {
    position: "absolute",
  },
  itemContainer: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    gap: 8,
    alignItems: "center",
    alignSelf: "stretch",
  },
  itemText: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 8,
    flex: 1,
  },
  itemDistance: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 4,
  },
  itemCrowdIndicator: {
    flexDirection: "row",
    display: "flex",
    gap: 10,
    alignItems: "center",
  },
  modalTitleContainer: {
    display: "flex",
    width: 350,
    padding: 12,
    flexDirection: "column",
    gap: 12,
  },
  modalContainer: {
    borderRadius: 8,
    marginHorizontal: 10,
  },
});
