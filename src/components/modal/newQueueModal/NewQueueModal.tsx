import React from "react";
import { Modal, Pressable, StyleSheet, View } from "react-native";

import { getColor } from "../../../utils";
import { Text } from "../../text";

interface NewQueueModalProps {
  visible: boolean;
  onClose: () => void;
}

const NewQueueModal = ({ visible, onClose }: NewQueueModalProps) => {
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
              Mengambil Nomor Antrian Baru
            </Text>
            <Text fontType="section" fontWeight="regular">
              Apakah anda yakin ingin membatalkan nomor antrian
              <Text fontType="section" fontWeight="bold">
                {" "}
                Teller "A-1"
              </Text>
              dan mengambil antrian baru?
            </Text>
          </View>

          <View style={styles.row}>
            <Pressable style={styles.buttonLeft}>
              <Text fontType="section" fontWeight="bold">
                Ya, Batalkan
              </Text>
            </Pressable>
            <Pressable style={styles.buttonRight}>
              <Text fontType="section" fontWeight="bold" color="white">
                Yakin
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default NewQueueModal;

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
    backgroundColor: getColor("grey200"),
    borderBottomLeftRadius: 6,
  },
  buttonRight: {
    flex: 1,
    paddingVertical: 6,
    paddingHorizontal: 16,
    alignItems: "center",
    alignSelf: "stretch",
    justifyContent: "center",
    backgroundColor: getColor("darkOrange"),
    borderBottomRightRadius: 6,
  },
});
