import React from "react";
import { Modal, Pressable, StyleSheet, View } from "react-native";

import { getColor } from "../../../utils";
import { Text } from "../../text";
import { postData } from "../../../services";
import { useNavigation } from "@react-navigation/native";

interface CancelQueueModalProps {
  visible: boolean;
  onClose: () => void;
  needs: string;
  branchId: number;
  queueNumber: number;
}

interface CancelAntrianBody {
  needs: string;
  branchId: number;
  queueNumber: number;
}

const CancelQueueModal = ({
  visible,
  onClose,
  needs,
  branchId,
  queueNumber,
}: CancelQueueModalProps) => {

  const navigation = useNavigation();
  

  const handleCancel = () => {
    postData<CancelAntrianBody, undefined>(
      "/queue-api/v1/queue-system/cancel-queue",
      { needs, branchId, queueNumber },
      {
        onError: (error) => {
          console.log(needs, branchId, queueNumber);
          console.log("Error:", error);
        },
        onSuccess: (data) => {
          if (data.status === 200 || data.status === 201) {
            onClose();
            navigation.navigate("LokasiKCScreen");
          }
        },
      }
    );
  };

  return (
    <Modal
      animationType="fade"
      transparent
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.innerContainer}>
        <Pressable style={styles.backdrop} onPress={onClose} />
        <View style={styles.modalContainer}>
          <View style={styles.modalText}>
            <Text fontType="body" fontWeight="bold">
              Membatalkan Nomor Antrian
            </Text>
            <Text fontType="section" fontWeight="regular">
              Apakah anda yakin ingin membatalkan nomor antrian
              <Text fontType="section" fontWeight="bold">
                {needs === "TELLER" ? "Teller" : "Customer Service"}{" "}
                {queueNumber}
              </Text>
              ?
            </Text>
          </View>

          <View style={styles.row}>
            <Pressable style={styles.buttonLeft} onPress={() => {handleCancel()}}>
              <Text fontType="section" fontWeight="bold" color="white">
                Ya, Batalkan
              </Text>
            </Pressable>
            <Pressable style={styles.buttonRight}>
              <Text fontType="section" fontWeight="bold">
                Tidak
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CancelQueueModal;

const styles = StyleSheet.create({
  backdrop: {
    width: "100%",
    height: "100%",
    position: "absolute",
    backgroundColor: "rgba(0,0,0,0.25)",
  },
  innerContainer: {
    flex: 1,
    justifyContent: "center",
    position: "relative",
  },
  modalContainer: {
    justifyContent: "center",
    backgroundColor: getColor("white"),
    marginHorizontal: 20,
    borderRadius: 6,
  },
  modalText: {
    padding: 24,
    gap: 8,
  },
  row: {
    height: 42,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "stretch",
    flexDirection: "row",
  },
  buttonLeft: {
    flex: 1,
    paddingVertical: 6,
    paddingHorizontal: 16,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "stretch",
    gap: 4,
    backgroundColor: getColor("darkOrange"),
    borderBottomLeftRadius: 6,
  },
  buttonRight: {
    flex: 1,
    paddingVertical: 6,
    paddingHorizontal: 16,
    alignItems: "center",
    alignSelf: "stretch",
    justifyContent: "center",
    backgroundColor: getColor("grey200"),
    borderBottomRightRadius: 6,
  },
});
