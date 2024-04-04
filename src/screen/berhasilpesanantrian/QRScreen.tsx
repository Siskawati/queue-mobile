import { useNavigation } from "@react-navigation/native";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import { useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  Alert,
} from "react-native";
import QRCode from "react-native-qrcode-svg";
import ViewShot from "react-native-view-shot";
import {
  BNI,
  Button,
  HomeHeaderMobile,
  Puas,
  Text,
  TidakPuas,
} from "../../components";
import { CancelQueueModal, NewQueueModal } from "../../components/modal";
import PuasAfter from "../../components/svg/PuasAfter";
import TidakPuasAfter from "../../components/svg/TidakPuasAfter";
import { getColor } from "../../utils";
import { ScreenProps } from "../../types";
import React from "react";
import CryptoJS from "react-native-crypto-js";

const QRScreen = ({ route }: ScreenProps<"QRScreen">) => {
  const [selectedFeedback, setSelectedFeedback] = useState<string>();
  const [newQueueModal, setNewQueueModal] = useState(false);
  const [cancelQueueModal, setCancelQueueModal] = useState(false);
  // const [antrianInfoHomeModal, setAntrianInfoHomeModal] = useState(true);
  const viewShotRef = useRef(null);
  const navigation = useNavigation();

  const userId = route.params.userId;
  const needs = route.params.needs;
  const branchId = route.params.branchId;
  const branchName = route.params.branchName;
  const queueDate = route.params.queueDate;
  const estimasi = route.params.estimasi;

  const handleFeedbackPress = (feedback: "tidakpuas" | "puas") => {
    if (feedback === selectedFeedback) {
      setSelectedFeedback(undefined);
    } else {
      setSelectedFeedback(feedback);
    }
  };

  // Encrypt
  const ciphertext = CryptoJS.AES.encrypt(
    JSON.stringify({
      userId: userId,
      needs: needs,
      branchId: branchId,
    }),
    "kelompok3juara"
  ).toString();

  // Decrypt
  const bytes = CryptoJS.AES.decrypt(ciphertext, "kelompok3juara");
  const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

  // Example usage
  useEffect(() => {
    console.log("encryption: ", ciphertext);
    console.log("decryption: ", decryptedData);
  }, []);

  const saveQRCode = async () => {
    try {
      if (!viewShotRef.current) {
        return; // Exit early if viewShotRef.current is null
      }

      const uri = await (viewShotRef.current as any).capture(); // Type assertion to any
      if (Platform.OS === "ios") {
        await MediaLibrary.saveToLibraryAsync(uri); // Save image to iOS photo library
        Alert.alert("Success", "QR Code saved to photo library.");
      } else if (Platform.OS === "android") {
        const { status } = await MediaLibrary.requestPermissionsAsync(); // Request permission to access media library on Android
        if (status === "granted") {
          const fileUri = `${FileSystem.cacheDirectory}qrcode.jpg`;
          await FileSystem.moveAsync({ from: uri, to: fileUri }); // Move the image file to the cache directory
          await MediaLibrary.saveToLibraryAsync(fileUri); // Save image to Android photo library
          Alert.alert("Success", "QR Code saved to photo library.");
        } else {
          Alert.alert(
            "Permission Required",
            "Please grant permission to access media library."
          );
        }
      }
    } catch (error) {
      console.error("Error saving QR code:", error);
      Alert.alert("Error", "Failed to save QR Code.");
    }
  };

  return (
    <View style={styles.container}>
      <NewQueueModal
        visible={newQueueModal}
        onClose={() => {
          setNewQueueModal(false);
        }}
      />

      {/* <CancelQueueModal
        visible={cancelQueueModal}
        onClose={() => {
          setCancelQueueModal(false);
        }}
      /> */}

      {/* header */}
      <View style={styles.header}>
        <View style={styles.iconkiri} />
        <Text fontWeight="semibold" fontType="body">
          QR Code
        </Text>
        <HomeHeaderMobile />
      </View>
      <ScrollView style={styles.content}>
        <ViewShot ref={viewShotRef} options={{ format: "jpg", quality: 1.0 }}>
          <View style={styles.isi}>
            {/* container tiket */}
            <View style={styles.containertiket}>
              <View style={styles.containertiketTitle}>
                <BNI />
                <Text
                  style={styles.titleBranchName}
                  fontType="section"
                  fontWeight="semibold"
                >
                  {branchName}
                </Text>
              </View>
              <View style={styles.divider} />
              <View style={styles.detailsection}>
                <View style={styles.sectiontanggal}>
                  <Text fontType="caption" fontWeight="semibold">
                    {new Date(queueDate).toDateString()}
                  </Text>
                  <Text fontType="caption" fontWeight="semibold">
                    {/* Queue Date, Time */}
                    {`${new Date(queueDate).getHours()}: ${new Date(
                      queueDate
                    ).getMinutes()} WIB`}
                  </Text>
                </View>
                <View style={styles.sectionnomor}>
                  <Text fontType="body" fontWeight="semibold">
                    {needs === "teller" ? "Teller" : "Customer Service"}
                  </Text>
                  {/* QR Code with logo */}

                  <QRCode value={ciphertext} size={230} />
                </View>
                <View>
                  <Text
                    style={styles.sectiontext}
                    fontType="caption"
                    fontWeight="medium"
                  >
                    Estimasi waktu sampai nomor anda dipanggil
                    <Text fontType="caption" fontWeight="bold">
                      {" "}
                      {estimasi}
                    </Text>
                  </Text>
                </View>
              </View>
            </View>

            {/* informasi penting */}
            <View style={styles.sectioninformasipenting}>
              <Text
                style={styles.titleinformasipenting}
                fontType="section"
                fontWeight="bold"
              >
                Informasi Penting
              </Text>
              <View style={styles.isiinformasipenting}>
                <Text
                  style={styles.textinformasipenting}
                  fontType="caption"
                  fontWeight="medium"
                >
                  1. Mohon menunjukkan nomor antrian online ini ke petugas kami
                  di kantor cabang
                </Text>
                <Text
                  style={styles.textinformasipenting}
                  fontType="caption"
                  fontWeight="medium"
                >
                  2. Harap menunggu sampai nomor antrian anda dipanggil
                </Text>
                <Text
                  style={styles.textinformasipenting}
                  fontType="caption"
                  fontWeight="medium"
                >
                  3. Setelah nomor anda dipanggil tunjukkan QR anda pada
                  teller/CS
                </Text>
              </View>
            </View>

            {/* feedback */}
            <View style={styles.sectionfeedback}>
              <Text
                style={styles.titlefeedback}
                fontType="section"
                fontWeight="semibold"
              >
                Bagaimana Perasaanmu Mengenai Fitur Ini?
              </Text>
              <View style={styles.feedbackContainer}>
                <TouchableOpacity
                  onPress={() => handleFeedbackPress("tidakpuas")}
                  style={styles.tidakpuas}
                >
                  {selectedFeedback === "tidakpuas" ? (
                    <TidakPuasAfter />
                  ) : (
                    <TidakPuas />
                  )}
                  <Text fontType="caption" fontWeight="regular">
                    Tidak Puas
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleFeedbackPress("puas")}
                  style={styles.puas}
                >
                  {selectedFeedback === "puas" ? <PuasAfter /> : <Puas />}
                  <Text fontType="caption" fontWeight="regular">
                    Puas
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ViewShot>
      </ScrollView>
      {/* footer */}
      <View style={styles.footer}>
        <Button
          textOptions={{
            color: "black",
            fontWeight: "semibold",
            fontType: "body",
          }}
          onPress={saveQRCode}
          style={styles.cancel}
        >
          Download QR
        </Button>

        <Button
          textOptions={{
            color: "white",
            fontWeight: "semibold",
            fontType: "body",
          }}
          onPress={() => navigation.goBack()}
          style={styles.antrianbaru}
        >
          Nomor Antrian
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: getColor("white"),
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
  iconkiri: {
    width: 24,
  },
  isi: {
    width: "100%",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 20,
    paddingHorizontal: 20,
    flex: 1,
    paddingVertical: 20,
  },

  //bug gabisa scroll di android
  content: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  containertiket: {
    padding: 16,
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 16,
    alignSelf: "stretch",
    borderRadius: 12,
    borderColor: getColor("grey200"),
    borderWidth: 1,
  },
  containertiketTitle: {
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "stretch",
    flexDirection: "row",
  },
  titleBranchName: {
    maxWidth: 190,
    textAlign: "right",
  },
  divider: {
    alignSelf: "stretch",
    width: "100%",
    height: 1,
    backgroundColor: getColor("grey200"),
  },
  detailsection: {
    flexDirection: "column",
    alignItems: "center",
    gap: 32,
    alignSelf: "stretch",
  },
  sectiontanggal: {
    justifyContent: "space-between",
    alignItems: "flex-start",
    alignSelf: "stretch",
    flexDirection: "row",
  },
  sectionnomor: {
    flexDirection: "column",
    alignItems: "center",
    gap: 16,
    alignSelf: "stretch",
  },
  nomor: {
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
    flexDirection: "row",
    alignSelf: "stretch",
  },
  antriansaatini: {
    width: 140,
    padding: 16,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
    borderRadius: 10,
    backgroundColor: getColor("grey200"),
  },
  antriankamu: {
    width: 140,
    padding: 16,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
    borderRadius: 10,
    backgroundColor: getColor("lightOrange"),
  },
  sectiontext: {
    textAlign: "center",
  },
  sectioninformasipenting: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 8,
    alignSelf: "stretch",
    borderRadius: 10,
    backgroundColor: getColor("lightOrange"),
  },
  titleinformasipenting: {
    color: getColor("darkOrange"),
  },
  isiinformasipenting: {
    flexDirection: "column",
    alignItems: "flex-start",
    alignSelf: "stretch",
    gap: 8,
  },
  textinformasipenting: {
    alignSelf: "auto",
    width: "100%",
    textTransform: "capitalize",
  },
  sectionfeedback: {
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
    alignSelf: "stretch",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: getColor("grey200"),
    flexDirection: "row",
  },
  titlefeedback: {
    flex: 1,
  },
  tidakpuas: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 2,
  },
  puas: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 2,
  },
  footer: {
    width: "92%",
    paddingBottom: 50,
    flexDirection: "row",
    marginHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
    backgroundColor: "white",
    // position: "absolute",
    bottom: 0,
    paddingTop: 16,
  },
  cancel: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
    flex: 1,
    borderRadius: 36,
    borderWidth: 2,
    borderColor: getColor("grey300"),
    backgroundColor: getColor("white"),
  },
  antrianbaru: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
    flex: 1,
    borderRadius: 36,
    backgroundColor: getColor("darkOrange"),
  },
  feedbackContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  feedbackItem: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
  },
  qrCodeContainer: {
    alignItems: "center",
    marginVertical: 0, // Adjust margin as needed
  },
});

export default QRScreen;
