import { Modal, StyleSheet, View } from "react-native";
import React from "react";
import Text from "../text/Text";
import Button from "../button/Button";
import { getColor } from "../../utils";

interface ErrorModalProps {
  text: string;
  code: number;
  visible: boolean;
  onClose: () => void;
}

const ErrorModal = ({ text, code, visible, onClose }: ErrorModalProps) => {
  return (
    <Modal animationType="fade" visible={visible} transparent>
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <Text style={styles.code} fontWeight="bold">
            {code}
          </Text>
          <Text style={styles.description}>{text}</Text>
          <Button
            textOptions={{
              color: "white",
            }}
            style={{
              backgroundColor: getColor("darkOrange"),
            }}
            onPress={onClose}
          >
            Tutup
          </Button>
        </View>
      </View>
    </Modal>
  );
};

export default ErrorModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  innerContainer: {
    backgroundColor: getColor("white"),
    padding: 16,
    borderRadius: 10,
    rowGap: 10,
    borderWidth: 1,
  },

  code: {
    fontSize: 36,
    textAlign: "center",
  },

  description: {
    textAlign: "center",
  },
});
