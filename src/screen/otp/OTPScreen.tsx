/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigation } from "@react-navigation/native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { View, StyleSheet, TextInput, TouchableOpacity } from "react-native";

import { ArrowLeft, Button, HomeHeaderMobile, Text } from "../../components";
import ArrrowRight from "../../components/svg/ArrowRight";
import { getColor, saveSecureKey } from "../../utils";
import { ScreenProps } from "../../types";
import { postData } from "../../services";
import { useSelector } from "../../redux";

interface OTPBody {
  email: string;
  otp: string;
}
interface OTPResponse {
  userId: number;
}

interface SuksesAntrianBody {
  userId: number;
  branchId: number;
  needs: string;
}

interface SuksesAntrianResponse {
  current_queue: number;
  last_queue: number;
  queue: Queue;
}

export interface Queue {
  queueId: number;
  queueNumber: number;
  onServing: boolean;
  needs: string;
  lastUpdateTime: string;
  queueDate: string;
  secondChance: boolean;
  status: string;
  user: User;
  branch: Branch;
  operator: any;
}

export interface User {
  userId: number;
  name: string;
  email: string;
  userType: string;
}

export interface Branch {
  branchId: number;
  branchName: string;
  address: string;
  longitude: number;
  latitude: number;
  subDistrict: string;
  city: string;
  province: string;
  urlString: string;
}

interface PesanAntrianBody {
  name: string;
  email: string;
  userType: string;
}

interface PesanAntrianResponse {
  otp: string;
  email: string;
  userType: string;
}

const OTPScreen = ({ route }: ScreenProps<"OTPScreen">) => {
  const [otp, setOTP] = useState<string[]>(["", "", "", ""]);
  const inputsRef = useRef<(TextInput | null)[]>([null, null, null, null]);
  const navigation = useNavigation(); // Initialize navigation hook
  const [resendTimer, setResendTimer] = useState<number>(60); // Countdown timer for resend button

  const { userType } = useSelector((state) => state.userType);

  const email = route.params.email;
  const name = route.params.name;
  const needs = route.params.needs;
  const branchId = route.params.branchId;

  const generateAntrian = useCallback(
    (userId: number) => {
      if (branchId && needs && userId) {
        postData<SuksesAntrianBody, SuksesAntrianResponse>(
          "/queue-api/v1/queue-system/add-queue",
          { userId, branchId, needs },
          {
            onSuccess: (data) => {
              console.log("data queue data", data.data);
              navigation.navigate("SuccessScreen", {
                queueDate: data.data.queue.queueDate,
                branchName: data.data.queue.branch.branchName,
                currentQueue: data.data.current_queue,
                lastQueue: data.data.last_queue,
                needs: data.data.queue.needs,
                userId: userId,
                branchId: branchId,
                queueNumber: data.data.queue.queueNumber,
              });
            },
            onError: (error) => {
              console.log("Error:", error);
            },
          }
        );
      }
    },
    [branchId, needs]
  );

  // Define a new function to handle button press
  const handleButtonPress = async () => {
    const enteredOTP = otp.join("");
    verifyOTPBackend(enteredOTP);
  };

  // OTP Handler
  const handleInput = (index: number, value: string) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    console.log(newOtp); // Check the updated OTP value
    setOTP(newOtp);
    // Focus the next input if value is not empty
    if (value !== "" && index < 3 && inputsRef.current[index + 1]) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  // Auto Redirect When OTP Full
  useEffect(() => {
    if (otp.every((val) => val !== "")) {
      verifyOTPBackend(otp.join(""));
    }
  }, [otp]);

  // Handle Backspace
  const handleBackspace = (index: number) => {
    if (otp[index] === "" && index > 0) {
      inputsRef.current[index - 1]?.focus();
      const newOtp = [...otp];
      newOtp[index - 1] = "";
      setOTP(newOtp);
    }
  };

  // Verify OTP Backend
  const verifyOTPBackend = (enteredOTP: string) => {
    console.log("email in function", email);
    postData<OTPBody, OTPResponse>(
      "/queue-api/v1/users/validate-otp",
      { email, otp: enteredOTP },
      {
        onError: (error) => {
          console.log("Error:", error);
          console.log("entered otp", enteredOTP);
          console.log("entered email", email);
        },
        onSuccess: (data) => {
          console.log("verify berhasil");
          generateAntrian(data.data.userId);
        },
      }
    );
  };

  // Timer Handler
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [resendTimer]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  // Handler Resend Code
  const handleResendCode = () => {
    setOTP(["", "", "", ""]);

    postData<PesanAntrianBody, PesanAntrianResponse>(
      "/queue-api/v1/users",
      { name, email, userType },
      {
        onError: (error) => {
          console.log("Error:", error);
        },
        onSuccess: (data) => {
          console.log(data);
        },
        onLoading: () => {
          // Handle loading state if needed
        },
        onFinally: () => {},
      }
    );

    setResendTimer(60);
  };

  return (
    <View style={styles.container}>
      {/* header */}
      <View style={styles.header}>
        <ArrowLeft />
        <Text fontWeight="semibold" fontType="body">
          Verifikasi OTP
        </Text>
        <HomeHeaderMobile />
      </View>

      {/* page content */}
      <View style={styles.content}>
        {/* text */}
        <Text fontType="section" fontWeight="regular" style={styles.textatas}>
          Kode verifikasi telah dikirim ke email mu! Silahkan masukkan kodenya
          dibawah ini.
        </Text>

        {/* Input OTP */}
        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <View key={index} style={styles.inputContainer}>
              <TextInput
                ref={(ref) => (inputsRef.current[index] = ref)}
                style={[
                  styles.otpInput,
                  digit !== "" && styles.otpInputFilled, // Apply otpInputFilled style if digit is filled
                ]}
                keyboardType="numeric"
                maxLength={1}
                onChangeText={(value) => handleInput(index, value)}
                value={digit}
                onKeyPress={({ nativeEvent }) => {
                  if (
                    nativeEvent.key === "Backspace" ||
                    nativeEvent.key === "Delete"
                  ) {
                    // Handle backspace or delete key press
                    handleBackspace(index);
                  }
                }}
              />
            </View>
          ))}
        </View>

        {/* Countdown timer */}
        {resendTimer > 0 ? (
          <Text fontType="section" style={styles.textKirimUlang}>
            Kirim ulang Kode? {formatTime(resendTimer)}
          </Text>
        ) : (
          <Text fontType="section" style={styles.textKirimUlang}>
            Kirim ulang Kode?{" "}
            <Text
              fontType="section"
              fontWeight="semibold"
              onPress={handleResendCode}
              style={styles.textKirimUlang}
            >
              Resend Code
            </Text>
          </Text>
        )}

        {/* Button */}
        <Button
          rightIconKey={<ArrrowRight />}
          onPress={handleButtonPress}
          style={styles.button}
          textOptions={{
            color: "white",
            fontWeight: "semibold",
            fontType: "body",
          }}
        >
          Selanjutnya
        </Button>
      </View>
    </View>
  );
};

export default OTPScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: getColor("white"),
    gap: 20,
    alignItems: "center",
  },
  header: {
    width: "100%",
    padding: 20,
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomColor: getColor("grey200"),
    borderBottomWidth: 1,
    backgroundColor: getColor("white"),
    marginTop: 45,
    flexDirection: "row",
  },
  content: {
    width: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
    paddingHorizontal: 20,
  },
  textatas: {
    alignSelf: "stretch",
  },
  otpContainer: {
    flexDirection: "row",
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    borderRadius: 8,
    gap: 16,
  },
  inputContainer: {
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  otpInput: {
    width: "100%",
    height: "100%",
    backgroundColor: "transparent",
    fontSize: 24,
    textAlign: "center",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: getColor("grey300"),
  },
  otpInputFilled: {
    // borderColor: getColor("darkOrange")
  },
  textKirimUlang: {
    alignSelf: "stretch",
  },
  button: {
    backgroundColor: getColor("darkOrange"),
    alignSelf: "stretch",
  },
});
