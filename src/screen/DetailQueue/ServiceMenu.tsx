import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  View,
} from "react-native";

import React, { useCallback, useEffect, useState } from "react";
import { Text } from "../../components";
import ServiceMenuNumber from "./ServiceMenuNumber";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { getData } from "../../services";

interface ServiceMenuProps {
  branchId: number;
  needs: "cs" | "teller";
  branchName: string;
}
interface BranchDataProps {
  active_operator: number;
  current_queue: number;
  last_queue: number;
  branchName: string;
}

const ServiceMenu = ({ branchId, needs }: ServiceMenuProps) => {
  const { bottom } = useSafeAreaInsets();

  const [branchData, setBranchData] = useState<BranchDataProps>({
    active_operator: 0,
    current_queue: 0,
    last_queue: 0,
    branchName: "",
  });

  // Function to calculate Estimasi
  const getEstimasi = () => {
    if (!branchData || !branchData.current_queue || !branchData.last_queue) {
      return "Estimasi tidak tersedia";
    }

    let timeMultiplier = 1;
    if (needs === "teller") {
      timeMultiplier = 3; // For Teller, time multiplier is 3 minutes
    } else if (needs === "cs") {
      timeMultiplier = 5; // For CS, time multiplier is 5 minutes
    }
    const estimasi =
    Math.ceil((branchData.last_queue - branchData.  current_queue) / branchData.active_operator * timeMultiplier);
    return estimasi > 0 ? `${estimasi} menit atau lebih` : "Saat ini dipanggil";
  };

  const fetchData = useCallback(() => {
    getData<undefined, BranchDataProps>(
      `/queue-api/v1/queue-system/get-queue/branch/${branchId}/${needs}`,
      undefined,
      {
        onSuccess(data) {
          setBranchData(data.data);
        },
        onError(error) {
          console.log("Error", error);
        },
      }
    );
  }, [branchId, needs]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const [showModal, setShowModal] = useState(false); // State untuk mengontrol visibilitas modal

  return (
    <View
      style={{
        paddingHorizontal: 20,
        paddingTop: 16,
        paddingBottom: bottom,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          columnGap: 8,
          marginBottom: 4,
        }}
      >
        <Text fontWeight="medium" fontType="caption">
          Jumlah {needs === "teller" ? "Teller" : "Customer Service"} Aktif
        </Text>
        <Text fontType="caption" color="lightTeal" fontWeight="bold">
          {branchData.active_operator}
        </Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          columnGap: 8,
        }}
      >
        <Text fontWeight="medium" fontType="caption">
          Estimasi Waktu
        </Text>
        <Text fontType="caption" color="lightTeal" fontWeight="bold">
          {getEstimasi()}
        </Text>
      </View>

      <View style={styles.valueContainer}>
        <ServiceMenuNumber
          backgroundColor="grey300"
          description="Antrian Saat Ini"
          value={branchData.current_queue}
        />
        <ServiceMenuNumber
          backgroundColor="lightOrange"
          description="Antrian Kamu"
          value={branchData.last_queue + 1}
        />
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={showModal}
        onRequestClose={() => setShowModal(false)}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
        >
          <Pressable onPress={() => setShowModal(false)} />
          {/* Komponen PopUpPesanAntrian ditampilkan di sini */}
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
};

export default ServiceMenu;

const styles = StyleSheet.create({
  valueContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    columnGap: 16,
    marginTop: 16,
    marginBottom: 24,
  },
});
