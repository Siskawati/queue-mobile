import React, { useCallback, useEffect, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";

import { Text } from "../..";
import { getColor } from "../../../utils";
import { useNavigation } from "@react-navigation/native";
import { getQueueRealtimeUpdates } from "../../../firebase";
import { OfficeService } from "../../../types";

interface AntrianInfoHomeModalProps {
  visible: boolean;
  onClose: () => void;
  queueDate: string;
  branchName: string;
  needs: OfficeService;
  userId: string;
  branchId: number;
  queueNumber: number;
}

interface QueueSubscriberProps {
  active_operator: number;
  current_queue: number;
  last_queue: number;
}

const AntrianInfoHomeModal: React.FC<AntrianInfoHomeModalProps> = ({
  queueDate,
  branchName,
  needs,
  userId,
  branchId,
  queueNumber,
}) => {
  const navigation = useNavigation();

  const [antrianData, setAntrianData] = useState<QueueSubscriberProps>();

  // Function to calculate Estimasi
  const getEstimasi = useCallback(() => {
    if (!antrianData?.current_queue || !antrianData?.last_queue) {
      return "Estimasi tidak tersedia";
    }

    let timeMultiplier = 1;
    if (needs === "TELLER") {
      timeMultiplier = 3; // For Teller, time multiplier is 3 minutes
    } else if (needs === "CS") {
      timeMultiplier = 5; // For CS, time multiplier is 5 minutes
    }
    const estimasi =
      (antrianData.last_queue - antrianData.current_queue)/antrianData.active_operator * timeMultiplier;
    return estimasi > 0 ? `${estimasi} menit atau lebih` : "Saat ini dipanggil";
  }, [antrianData?.current_queue, antrianData?.last_queue, needs]);

  useEffect(() => {
    console.log("branch id", branchId);
    console.log("office servce", needs);
    const unsubscribe = getQueueRealtimeUpdates<QueueSubscriberProps>({
      branchId,
      officeService: needs,
      onError(error) {
        console.log("errors", error);
      },
      onSubscribe(data) {
        const response = data.data();
        if (response) {
          setAntrianData(response);
        }
      },
    });

    return () => unsubscribe();
  }, [branchId, needs]);
  return (
    <Pressable
      style={styles.modalContainer}
      onPress={() => {
        if (antrianData) {
          navigation.navigate("SuccessScreen", {
            queueDate: queueDate,
            branchName: branchName,
            currentQueue: antrianData.current_queue,
            lastQueue: antrianData.last_queue,
            needs: needs,
            userId: Number(userId),
            branchId: branchId,
            queueNumber: queueNumber,
          });
        }
      }}
    >
      <View style={styles.modalKiri}>
        <View style={styles.textTitle}>
          <Text
            fontType="section"
            fontWeight="semibold"
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {branchName}
          </Text>
          <Text fontType="caption" fontWeight="medium" style={styles.textJenis}>
            Antrian Online -{" "}
            {needs === "TELLER" ? "Teller" : "Customer Service"}
          </Text>

        </View>
        <Text
          fontType="caption"
          fontWeight="semibold"
          style={styles.textEstimasi}
        >
          {getEstimasi()}
        </Text>
      </View>
      <View style={styles.modalKanan}>
        <Text fontWeight="semibold" style={styles.nomorAntrian}>
          {queueNumber}
        </Text>
        <Text fontType="caption" fontWeight="medium">
          Antrian Kamu
        </Text>
      </View>
    </Pressable>
  );
};

export default AntrianInfoHomeModal;

const styles = StyleSheet.create({
  modalContainer: {
    position: "absolute",
    alignItems: "center",
    bottom: 80,
    justifyContent: "center",
    backgroundColor: getColor("white"),
    marginHorizontal: 16,
    borderRadius: 6,
    padding: 12,
    flexDirection: "row",
    gap: 16,
    zIndex: 1,
    borderWidth: 1,
    width: "100%",
    borderColor: getColor("grey200"),

    // shadow
    shadowColor: "#7a7a7a", // Adjust for your desired shadow color
    shadowOffset: { width: 0, height: 10 }, // Offset the shadow vertically
    shadowOpacity: 0.27, // Set the shadow opacity
    shadowRadius: 10, // Control the blur radius of the shadow
    elevation: 4, // Optional: Add some elevation on Android (Android only)
  },
  modalText: {
    padding: 24,
    gap: 8,
  },
  modalKiri: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    flex: 1,
    alignSelf: "stretch",
  },
  modalKanan: {
    padding: 8,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 2,
    borderRadius: 6,
    backgroundColor: getColor("lightOrange"),
  },
  textTitle: {
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 4,
    alignSelf: "stretch",
  },
  Title: {
    flex: 1,
  },
  textJenis: {
    color: getColor("grey500"),
  },
  textEstimasi: {
    color: getColor("lightTeal"),
  },
  nomorAntrian: {
    fontSize: 24,
    textAlign: "center",
    color: getColor("black"),
    fontStyle: "normal",
  },
});
