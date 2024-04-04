import {
  Alert,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  View,
} from "react-native";

import { getColor } from "../../../utils";
import { Button } from "../../button";
import { HomeHeaderMobile, HomeOutline, Subtract, XBlack } from "../../svg";
import ArrrowRight from "../../svg/ArrowRight";
import { Text } from "../../text";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { postData } from "../../../services";
import React from "react";
import { TextInput } from "../../input/textInput";

interface CekNomorAntrianProps {
  visible: boolean;
  onClose: () => void;
}

interface VerifikasiEmailBody {
  email: string;
}
interface VerifikasiEmailResponse {
  queueDate: string;
  branchName: string;
  currentQueue: number;
  lastQueue: number;
  needs: string;
  userId: number;
  branchId: number;
  userType: string;
}

const CekNomorAntrian: React.FC<CekNomorAntrianProps> = ({
  visible,
  onClose,
}) => {
  const [isSearching, setIsSearching] = useState(false);
  const [email, setEmail] = useState("");
  const [errorVisible, setErrorVisible] = useState(false);
  const navigation = useNavigation();

  const handleBlur = () => {
    setIsSearching(false);
    setTimeout(() => {
      setIsSearching(false);
    }, 100);
  };

  const isValidEmail = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handlePress = async () => {
    if (!isValidEmail(email)) {
      Alert.alert("Please enter a valid email address.");
      return;
    }
    verifyEmail(email);
  };

  const verifyEmail = async (email: string) => {
    console.log("email", email);
    postData<VerifikasiEmailBody, VerifikasiEmailResponse>(
      "/queue-api/v1/queue-system/check-queue",
      { email },
      {
        onError: (error) => {
          console.log("Error verifying email:", error);
          setErrorVisible(true);
        },
        onSuccess: (data) => {
          console.log("Verification response:", data);
          if (data.status === 200) {
            navigation.navigate("SuccessScreen", {
              queueDate: data.data.queueDate,
              branchName: data.data.branchName,
              currentQueue: data.data.currentQueue,
              lastQueue: data.data.lastQueue,
              needs: data.data.needs,
              userId: data.data.userId,
              branchId: data.data.branchId,
              userType: data.data.use,
            });
            onClose();
            console.log("Email Verified");
          } else {
            setErrorVisible(true);
            console.log("error");
          }
        },
      }
    );
  };

  const handleClose = () => {
    setEmail(""); // Clear the input value
    setIsSearching(false);
    onClose();
  };

  return (
    <Modal
      animationType="slide"
      transparent
      visible={visible}
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
        style={styles.innerContainer}
      >
        <View style={styles.innerContainer}>
          <Pressable style={styles.backdrop} onPress={handleClose} />
          <View style={styles.modalContainer}>
            <View style={styles.headerTitle}>
              <Pressable onPress={handleClose}>
                <XBlack />
              </Pressable>

              <Text fontType="body" fontWeight="semibold">
                Cek Nomor Antrian
              </Text>
              <View style={styles.icon}></View>
            </View>
            <View style={styles.textContainer}>
              <Text fontType="section" fontWeight="semibold">
                Data User
              </Text>
              <View style={styles.email}>
                <Text fontType="caption" fontWeight="bold">
                  Email
                </Text>
                <Text fontType="caption" fontWeight="regular" color="grey500">
                  Silahkan Masukkan Email Yang Telah Kamu Daftarkan
                </Text>
              </View>
              <View style={styles.textInput}>
                <TextInput
                  placeholder="Masukkan Email kamu"
                  onFocus={() => setIsSearching(true)}
                  onChangeText={setEmail}
                  value={email}
                  onBlur={handleBlur}
                />
                {errorVisible && (
                  <Text
                    fontType="caption"
                    fontWeight="medium"
                    color="darkOrange"
                  >
                    Anda Tidak Memiliki Nomor Antrian Aktif
                  </Text>
                )}
              </View>
              <Button
                rightIconKey={<ArrrowRight />}
                style={styles.button}
                onPress={handlePress}
                textOptions={{
                  color: "white",
                  fontWeight: "semibold",
                }}
              >
                Selanjutnya
              </Button>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    width: "100%",
    height: "100%",
    position: "absolute",
    backgroundColor: "rgba(0,0,0,0.25)",
  },
  icon: {
    width: 24,
  },
  innerContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    alignContent: "center",
    position: "relative",
  },
  headerTitle: {
    flexDirection: "row",
    width: "100%",
    padding: 20,
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: getColor("grey200"),
  },
  textContainer: {
    width: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    paddingHorizontal: 20,
    paddingVertical: 24,
    gap: 16,
  },
  inputContainer: {
    paddingHorizontal: 20,
    rowGap: 16,
  },
  email: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    gap: 4,
  },
  textInput: {
    display: "flex",
    height: 44,
    gap: 10,
    alignSelf: "stretch",
  },
  button: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 32,
    alignSelf: "stretch",
    backgroundColor: getColor("darkOrange"),
  },
  modalContainer: {
    justifyContent: "center",
    backgroundColor: getColor("white"),
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 24,
  },
});

export default CekNomorAntrian;
