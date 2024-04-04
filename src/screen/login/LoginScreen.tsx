import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import AlternativeIcon from "./AlternativeIcon";
import Caution from "./Caution";
import InputModal from "./InputModal";
import {
  BNIBesar,
  Button,
  FaceID,
  Headphones,
  Image,
  Text,
} from "../../components";
import { getColor } from "../../utils";

const LoginScreen = () => {
  const { bottom } = useSafeAreaInsets();
  const [showModal, setShowModal] = useState(false);
  const [warning, setShowWarning] = useState(true);

  return (
    <View
      style={StyleSheet.flatten([
        styles.container,
        {
          paddingBottom: bottom,
        },
      ])}
    >
      <View style={styles.background}>
        <Image image="background" />
      </View>

      <InputModal
        visible={showModal}
        onClose={() => {
          setShowModal(false);
        }}
      />

      {warning && (
        <Caution
          onClose={() => {
            setShowWarning(false);
          }}
        />
      )}
      <View style={styles.loginContainer}>
        <View style={styles.imageContainer}>
          <BNIBesar />
        </View>

        <Button
          rightIconKey={<FaceID />}
          textOptions={{
            color: "white",
            fontWeight: "semibold",
            fontType: "body",
          }}
          onPress={() => setShowModal(true)}
          style={styles.login}
        >
          Login
        </Button>

        <AlternativeIcon />
      </View>

      <View style={styles.chatButtonContainer}>
        <Button
          leftIconKey={<Headphones />}
          style={styles.chatButton}
          textOptions={{
            color: "black",
            fontType: "caption",
            fontWeight: "bold",
          }}
        >
          Chat Us
        </Button>
        <Text fontType="caption" fontWeight="bold" color="black">
          Version 5.12.0
        </Text>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: getColor("darkTeal"),
    position: "relative",
  },
  background: {
    position: "absolute",
    width: 12,
    height: "100%",
    resizeMode: "repeat",
  },
  loginContainer: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
  },
  login: {
    marginBottom: 27,
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 32,
  },
  image: {
    width: 174,
    height: 54,
  },
  chatButton: {
    backgroundColor: getColor("white"),
    paddingHorizontal: 16,
    width: 104,
    borderWidth: 1,
    borderColor: getColor("grey300"),
    marginBottom: 15,
  },
  chatButtonContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 28,
  },
});
