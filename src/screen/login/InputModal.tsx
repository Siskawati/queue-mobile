import { useNavigation } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import { View, Modal, Pressable, StyleSheet } from "react-native";
import { useForm } from "react-hook-form";
import { Text, Checkbox, Button, RHFTextInput } from "../../components";
import { setToken, setUserType, useDispatch } from "../../redux";
import { decodeToken, getColor, saveSecureKey } from "../../utils";
import { postData } from "../../services";

interface InputModalProps {
  visible: boolean;
  onClose: () => void;
}

interface LoginRequestBody {
  userId: string;
  mpin: string;
}

export interface LoginForm {
  userId: string;
  mpin: string;
}

interface LoginRequestResponse {
  token: string;
}
interface VerifikasiEmailResponse {
  queueDate: string;
  branchName: string;
  currentQueue: number;
  lastQueue: number;
  needs: string;
  userId: number;
  branchId: number;
}
interface VerifikasiEmailBody {
  email: string;
}

const InputModal = ({ visible, onClose }: InputModalProps) => {
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<LoginForm>({
    defaultValues: {
      mpin: "",
      userId: "",
    },
    reValidateMode: "onChange",
    mode: "onChange",
  });

  const [checkbox, setCheckbox] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [userId, setUserId] = useState("");
  const [mpin, setMPin] = useState("");

  const handleReset = useCallback(() => {
    setUserId("");
    setMPin("");
  }, []);

  const handleLogin = async ({ mpin, userId }: LoginForm) => {
    postData<LoginRequestBody, LoginRequestResponse>(
      "/queue-api/v1/auth/login-mbank",
      {
        mpin,
        userId,
      },
      {
        onError() {
          alert("An error occurred during login. Please try again.");
        },
        onSuccess(data) {
          console.log("data", data);
          dispatch(setUserType("USER_MBANK"));
          dispatch(setToken(data.data.token));
          saveSecureKey("authToken", data.data.token);
          handleReset();
          onClose();
          navigation.navigate("HomeScreen");
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
          <View style={styles.modalTitleContainer}>
            <Text fontType="body" fontWeight="semibold" style={styles.greet}>
              Selamat Datang Kembali,
            </Text>
          </View>

          <View style={styles.inputContainer}>
            <RHFTextInput
              defaultValue=""
              rightButtonElement={
                <Text fontWeight="bold" fontType="caption" color="lightTeal">
                  Lupa User ID?
                </Text>
              }
              label="User ID"
              control={control}
              name="userId"
              rules={{
                required: "Input harus diisi",
              }}
            />
            <RHFTextInput
              defaultValue=""
              rightButtonElement={
                <Text fontWeight="bold" fontType="caption" color="lightTeal">
                  Lupa mPIN?
                </Text>
              }
              label="MPIN"
              control={control}
              rules={{
                required: "Input harus diisi",
              }}
              name="mpin"
            />
          </View>

          <View style={styles.checkboxContainer}>
            <Checkbox
              text="Simpan User ID"
              style={styles.checkbox}
              value={checkbox}
              onValueChange={() => setCheckbox((prevState) => !prevState)}
            />

            <Button
              textOptions={{
                color: "white",
                fontWeight: "semibold",
              }}
              disabled={!isValid}
              onPress={handleSubmit(handleLogin)}
            >
              Login
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default InputModal;

const styles = StyleSheet.create({
  backdrop: {
    width: "100%",
    height: "100%",
    position: "absolute",
    backgroundColor: "rgba(0,0,0,0.25)",
  },
  checkboxContainer: {
    paddingHorizontal: 20,
  },
  checkbox: {
    marginVertical: 20,
  },
  innerContainer: {
    flex: 1,
    justifyContent: "center",
    position: "relative",
  },
  greet: {
    padding: 20,
  },

  inputContainer: {
    paddingHorizontal: 20,
    rowGap: 16,
  },

  modalTitleContainer: {
    borderBottomWidth: 1,
    marginBottom: 24,
    borderBottomColor: getColor("grey300"),
  },
  modalContainer: {
    justifyContent: "center",
    backgroundColor: getColor("white"),
    borderRadius: 20,
    paddingBottom: 24,
    marginHorizontal: 10,
  },
});
