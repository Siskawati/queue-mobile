import React from "react";
import { Modal, Pressable, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Text from "../../text/Text";
import { deleteSecureKey, getColor } from "../../../utils";
import { removeToken, setUserType, useDispatch } from "../../../redux";

interface ExpiredQueueModalProps {
  visible: boolean;
  onClose: () => void;
}

const LogoutModal = ({ visible, onClose }: ExpiredQueueModalProps) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      console.log("token sudah dihapus");
      await deleteSecureKey("authToken");
      dispatch(removeToken());
      dispatch(setUserType("ANONYMOUS"));
      onClose();
      navigation.navigate("LoginScreen");
    } catch (error) {
      console.error("Error logging out:", error);
    }
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
              Logout
            </Text>
            <Text fontType="section" fontWeight="regular">
              Apakah Kamu Yakin Ingin Keluar?
            </Text>
          </View>

          <View style={styles.row}>
            <Pressable style={styles.buttonLeft} onPress={onClose}>
              <Text fontType="section" fontWeight="bold">
                Batalkan
              </Text>
            </Pressable>
            <Pressable style={styles.buttonRight} onPress={handleLogout}>
              <Text fontType="section" fontWeight="bold" color="white">
                Ya, Keluar
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default LogoutModal;

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
