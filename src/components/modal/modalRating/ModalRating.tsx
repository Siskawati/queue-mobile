import React from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

import { getColor } from "../../../utils";
import { Text } from "../../text";
import { Puas, TidakPuas } from "../../svg";
import { postData } from "../../../services";

interface ModalRatingBody {
  userId: string;
  feedbackMessage: string;
}

interface ModalRatingProps {
  visible: boolean;
  onClose: () => void;
  userId: string;
}

const ModalRating = ({
  visible,
  onClose,
  userId,
}: ModalRatingProps) => {

  const handleFeedbackPress = (feedback: "not_satisfied" | "satisfied") => {
    postData<ModalRatingBody, undefined>(
      "/queue-api/v1/user-feedbacks",
      { userId, feedbackMessage: feedback },
      {
        onError(Error) {
          console.error("Error:", Error);
        },
        onSuccess(data) {
          console.log("Response:", data);
          onClose();
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
            <Text fontType="headerMobile" fontWeight="bold">
              Bagaimana Perasaanmu Mengenai Fitur Ini?
            </Text>
          </View>

          <View style={styles.feedbackContainer}>
            <TouchableOpacity
              onPress={() => handleFeedbackPress("not_satisfied")}
              style={styles.tidakpuas}
            >
              <TidakPuas />
              <Text fontType="caption" fontWeight="regular">
                Tidak Puas
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleFeedbackPress("satisfied")}
              style={styles.puas}
            >
              <Puas />
              <Text fontType="caption" fontWeight="regular">
                Puas
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalRating;

const styles = StyleSheet.create({
  backdrop: {
    width: "100%",
    height: "100%",
    position: "absolute",
    backgroundColor: "rgba(0,0,0,0.25)",
  },

  tidakpuas: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 2,
  },
  feedbackContainer: {
    display: "flex",
    padding: 8,
    justifyContent: "space-evenly",
    flexDirection: "row",
    alignSelf: "stretch",
    alignItems: "center",
  },
  puas: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 2,
  },
  innerContainer: {
    flex: 1,
    justifyContent: "center",
    position: "relative",
  },
  modalContainer: {
    justifyContent: "center",
    display: "flex",
    width: 330,
    flexDirection: "column",
    alignSelf: "center",
    backgroundColor: getColor("white"),
    borderRadius: 6,
    padding: 8,
  },
  modalText: {
    display: "flex",
    alignItems: "flex-start",
    alignSelf: "stretch",
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