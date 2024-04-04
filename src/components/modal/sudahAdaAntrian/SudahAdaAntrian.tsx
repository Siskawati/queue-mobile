import { Modal, Pressable, StyleSheet, View } from "react-native";

import { getColor } from "../../../utils";
import { Text } from "../../text";
import React from "react";
interface SudahAdaAntrianProps {
  visible: boolean;
  onClose: () => void;
}

const SudahAdaAntrian = ({ visible, onClose }: SudahAdaAntrianProps) => {
  return (
    <Modal
      animationType="fade"
      transparent
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.innerContainer}>
        <Pressable style={styles.backdrop} />
        <View style={styles.modalContainer}>
          <View style={styles.text}>
            <Text fontType="body" fontWeight="semibold">
              Sudah Memiliki Nomor Antrian
            </Text>
            <Text fontType="caption" fontWeight="regular">
              Kamu sudah memiliki nomor antrian{" "}
              <Text fontType="caption" fontWeight="bold">
                Teller A-1{" "}
              </Text>
              Silahkan menunggu sampai nomormu dipaggil
            </Text>
          </View>
          <View style={styles.buttonBig}>
            <View style={styles.button}>
              <Pressable onPress={onClose} />
              <Text fontType="caption" fontWeight="semibold">
                Nomor Antrianmu
              </Text>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default SudahAdaAntrian;

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
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: getColor("white"),
    width: 330,
    flexDirection: "column",
    alignItems: "flex-start",
    borderRadius: 6,
  },
  text: {
    padding: 24,
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 8,
    alignSelf: "stretch",
  },
  buttonBig: {
    height: 42,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "stretch",
  },
  button: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: getColor("grey200"),
    flex: 1,
    alignSelf: "stretch",
    gap: 4,
    borderBottomRightRadius: 6,
    borderBottomLeftRadius: 6,
  },
});
