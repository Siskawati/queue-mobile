import React, { useState } from "react";
import {
  View,
  Modal,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
} from "react-native";
import {
  Text,
  Button,
  XBlack,
  RHFTextInput,
  TextInput,
} from "../../components";
import ArrowRight from "../../components/svg/ArrowRight";
import { getColor } from "../../utils";
import { postData } from "../../services";
import { useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import { UserRequestType } from "../../types/User";
import { useSelector } from "../../redux";

interface InputModalProps {
  visible: boolean;
  onClose: () => void;
  currentQueue: number;
  lastQueue: number;
  branchId: number;
  needs: string;
}
interface PesanAntrianBody {
  name: string;
  email: string;
  userType: string;
}

interface PesanAntrianFormProps {
  name: string;
  email: string;
}

interface PesanAntrianResponse {
  otp: string;
  email: string;
  userType: string;
}

const PopUpPesanAntrian = ({
  visible,
  onClose,
  currentQueue,
  lastQueue,
  branchId,
  needs,
}: InputModalProps) => {

  const {userType} = useSelector(state => state.userType)
  const navigation = useNavigation();
  const [data, setData] = useState<any[]>([]);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<PesanAntrianFormProps>({
    defaultValues: {
      email: "",
      name: "",
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  // const [userType, setUserType] = useState("ANONYMOUS");

  const LoadingIndicator = () => (
    <ActivityIndicator size="small" color="white" animating />
  );

  // Function to calculate Estimasi
  const getEstimasi = () => {
    if (!currentQueue || !lastQueue) {
      return "Estimasi tidak tersedia";
    }

    let timeMultiplier = 1;
    if (needs === "teller") {
      timeMultiplier = 3; // For Teller, time multiplier is 3 minutes
    } else if (needs === "cs") {
      timeMultiplier = 5; // For CS, time multiplier is 5 minutes
    }

    const estimasi = (lastQueue - currentQueue) * timeMultiplier;
    return estimasi > 0 ? `${estimasi} menit atau lebih` : "Saat ini dipanggil";
  };

  const handleOTP = ({ name, email }: PesanAntrianFormProps) => {
    postData<PesanAntrianBody, PesanAntrianResponse>(
      "/queue-api/v1/auth/register",
      { name, email, userType },
      {
        onError: (error) => {
          console.log(email, name, needs, userType, branchId);
          console.log("Error:", error);
        },
        onSuccess: (data) => {
          if (data.status === 200 || data.status === 201) {
            onClose();
            navigation.navigate("OTPScreen", {
              email: email,
              name: name,
              needs: needs,
              branchId: branchId,
            });
          }
        },
        onLoading: () => {
          setIsLoading(true);
        },
        onFinally: () => {
          setIsLoading(false);
        },
      }
    );
  };

  return (
    <Modal animationType="slide" transparent visible={visible}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
        style={styles.innerContainer}
      >
        <View style={styles.innerContainer}>
          <Pressable style={styles.backdrop} onPress={onClose} />
          <View style={styles.modalContainer}>
            <View style={styles.headerTitle}>
              <TouchableOpacity onPress={onClose}>
                <XBlack style={styles.backButton} />
              </TouchableOpacity>
              <Text
                fontType="body"
                fontWeight="semibold"
                style={styles.greetPopUp}
              >
                Pesan Antrian KC
              </Text>
              <Text></Text>
            </View>
            <Text
              fontType="section"
              fontWeight="semibold"
              style={styles.greetTop}
            >
              Data User
            </Text>
            <View style={styles.inputContainer}>
              <RHFTextInput
                label="Nama"
                placeholder="Masukkan Nama Kamu"
                control={control}
                name="name"
                rules={{
                  required: "Nama harus diisi",
                  minLength: { value: 3, message: "Minimal 3 huruf" },
                }}
              />
              <RHFTextInput
                label="Email"
                placeholder="Masukkan Email Kamu"
                control={control}
                name="email"
                rules={{
                  required: "Email harus diisi",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "invalid email address",
                  },
                }}
              />
            </View>
            <View>
              <Text
                fontType="section"
                fontWeight="semibold"
                style={styles.greet}
              >
                Detail Antrian
              </Text>
              <View style={styles.textDetailAntrian}>
                <Text fontType="caption">Jenis Antrian</Text>
                <Text
                  fontType="caption"
                  fontWeight="semibold"
                  style={styles.FilledText}
                >
                  {needs === "teller" ? "Teller" : "Customer Service"}
                </Text>
              </View>
              <View style={styles.textDetailAntrian}>
                <Text fontType="caption">Antrian Saat Ini</Text>
                <Text
                  fontType="caption"
                  fontWeight="semibold"
                  style={styles.FilledText}
                >
                  {currentQueue}
                </Text>
              </View>
              <View style={styles.textDetailAntrian}>
                <Text fontType="caption">Nomor Antrian Kamu</Text>
                <Text
                  fontType="caption"
                  fontWeight="semibold"
                  style={styles.FilledText}
                >
                  {lastQueue + 1}
                </Text>
              </View>
              <View style={styles.textDetailAntrian}>
                <Text fontType="caption">Estimasi Waktu</Text>
                <Text
                  fontType="caption"
                  fontWeight="semibold"
                  style={styles.FilledText}
                >
                  {getEstimasi()}
                </Text>
              </View>
            </View>

            <View style={styles.checkboxContainer}>
              <Button
                style={styles.buttonOrange}
                onPress={handleSubmit(handleOTP)}
                disabled={isLoading || !isValid}
                textOptions={{
                  color: isLoading ? "white" : "white", // Change text color
                  fontWeight: "semibold",
                }}
              >
                {isLoading ? <LoadingIndicator /> : "Selanjutnya"}
              </Button>
              <ArrowRight />
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default PopUpPesanAntrian;

const styles = StyleSheet.create({
  backdrop: {
    width: "100%",
    height: "100%",
    position: "absolute",
    backgroundColor: "rgba(0,0,0,0.25)",
  },
  FilledText: {
    color: getColor("lightTeal"),
  },
  buttonOrange: {
    backgroundColor: getColor("darkOrange"),
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-around",
  },
  backButton: {
    marginTop: 18,
  },
  checkboxContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  textDetailAntrian: {
    flexDirection: "row",
    marginBottom: 8,
    justifyContent: "space-between",
    paddingLeft: 20,
    paddingRight: 20,
  },
  headerTitle: {
    flexDirection: "row",
    marginBottom: 24,
    justifyContent: "space-between",
    paddingLeft: 20,
    paddingRight: 20,
    borderBottomWidth: 1,
    borderBottomColor: getColor("grey300"),
  },
  checkbox: {
    marginVertical: 20,
  },
  innerContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    alignContent: "center",
    position: "relative",
  },
  greet: {
    padding: 16,
  },
  greetTop: {
    paddingLeft: 20,
    paddingBottom: 20,
  },
  greetPopUp: {
    padding: 20,
    textAlign: "center",
    paddingLeft: 0,
  },
  inputContainer: {
    paddingHorizontal: 20,
    rowGap: 16,
  },
  modalContainer: {
    justifyContent: "center",
    backgroundColor: getColor("white"),
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 24,
  },
  iconkiri: {},
});
