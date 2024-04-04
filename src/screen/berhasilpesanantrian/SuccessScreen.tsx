import { useNavigation } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
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
import Toaster from "../../components/toaster/Toaster";
import { OfficeService, ScreenProps } from "../../types";
import { getColor, saveSecureKey } from "../../utils";

import { getQueueRealtimeUpdates } from "../../firebase";
import { useSelector } from "../../redux";

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

interface QueueSubscriberProps {
  active_operator: number;
  current_queue: number;
  last_queue: number;
}

const SuccessScreen = ({ route }: ScreenProps<"SuccessScreen">) => {
  const [selectedFeedback, setSelectedFeedback] = useState<string>();
  const [newQueueModal, setNewQueueModal] = useState(false);
  const [cancelQueueModal, setCancelQueueModal] = useState(false);
  const [showToaster, setShowToaster] = useState(false);

  const navigation = useNavigation();

  const [antrianData, setAntrianData] = useState<QueueSubscriberProps>();

  const { userType } = useSelector((state) => state.userType);

  const queueDate = route.params.queueDate;
  const branchName = route.params.branchName;
  const needs = route.params.needs;
  const userId = route.params.userId;
  const branchId = route.params.branchId;
  const queueNumber = route.params.queueNumber;

  // Feedback
  const handleFeedbackPress = (feedback: "tidakpuas" | "puas") => {
    if (feedback === selectedFeedback) {
      setSelectedFeedback(undefined);
    } else {
      setSelectedFeedback(feedback);
    }
  };

  // Function to calculate Estimasi
  const getEstimasi = () => {
    if (!antrianData?.last_queue || !antrianData?.current_queue) {
      return "Estimasi tidak tersedia";
    }

    let timeMultiplier = 1;
    if (needs === "TELLER") {
      timeMultiplier = 3; // For Teller, time multiplier is 3 minutes
    } else if (needs === "CS") {
      timeMultiplier = 5; // For CS, time multiplier is 5 minutes
    }

    const estimasi =
      (antrianData.last_queue - antrianData.current_queue) * timeMultiplier;
    return estimasi > 0 ? `${estimasi} menit atau lebih` : "Saat ini dipanggil";
  };

  useEffect(() => {
    console.log("needs :", needs);
    console.log("SuccessScreen : ", userType);

    const unsubscribe = getQueueRealtimeUpdates<QueueSubscriberProps>({
      branchId,
      officeService: needs?.toUpperCase() as OfficeService,
      onError(error) {
        console.log("errors", error);
      },
      onSubscribe(data) {
        const response = data.data();
        if (response) {
          setAntrianData(response);
        }
      },
    });

    return () => unsubscribe();
  }, [branchId, needs, userType]);

  return (
    <View style={styles.container}>
      {showToaster && (
        <Toaster
          message="Antrian berhasil Dibatalkan"
          onClose={() => setShowToaster(false)}
        />
      )}
      <NewQueueModal
        visible={newQueueModal}
        onClose={() => {
          setNewQueueModal(false);
        }}
      />

      <CancelQueueModal
        visible={cancelQueueModal}
        onClose={() => {
          setCancelQueueModal(false);
        }}
        needs={needs}
        branchId={branchId}
        queueNumber={queueNumber}
      />

      <ScrollView style={styles.content}>
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
                  {needs === "TELLER" ? "Teller" : "Customer Service"}
                </Text>
                <View style={styles.nomor}>
                  <View style={styles.antriansaatini}>
                    <Text fontType="nomorAntrian" fontWeight="semibold">
                      {antrianData?.current_queue ?? ""}
                    </Text>
                    <Text fontType="caption" fontWeight="medium">
                      Antrian Saat Ini
                    </Text>
                  </View>
                  <View style={styles.antriankamu}>
                    <Text fontType="nomorAntrian" fontWeight="semibold">
                      {queueNumber}
                    </Text>
                    <Text fontType="caption" fontWeight="medium">
                      Antrian Kamu
                    </Text>
                  </View>
                </View>
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
                    {getEstimasi()}
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
                1. Mohon menunjukkan nomor antrian online ini ke petugas kami di
                kantor cabang
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
                3. Setelah nomor anda dipanggil tunjukkan qR anda pada teller/CS
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
      </ScrollView>

      {/* footer */}
      <View style={styles.footer}>
        <Button
          textOptions={{
            color: "black",
            fontWeight: "semibold",
            fontType: "body",
          }}
          onPress={() => setCancelQueueModal(true)}
          style={styles.cancel}
        >
          Cancel
        </Button>

        <Button
          textOptions={{
            color: "white",
            fontWeight: "semibold",
            fontType: "body",
          }}
          onPress={() => {
            navigation.navigate("QRScreen", {
              needs: needs,
              branchId: branchId,
              userId: userId,
              branchName: branchName,
              queueDate: queueDate,
              estimasi: getEstimasi(),
            });
          }}
          style={styles.antrianbaru}
        >
          Show QR
        </Button>
      </View>
    </View>
  );
};

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
  },

  //bug gabisa scroll di android
  content: {
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
    gap: 8,
    backgroundColor: "white",
    position: "absolute",
    bottom: 0,
    paddingTop: 16,
  },
  cancel: {
    paddingHorizontal: 15,
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
  scanbarcode: {
    justifyContent: "center",
    alignContent: "center",
    borderRadius: 35,
    borderWidth: 2,
    backgroundColor: getColor("white"),
    width: 20,
    paddingHorizontal: 22,

    borderColor: getColor("grey300"),
  },
  antrianbaru: {
    paddingHorizontal: 20,
    paddingVertical: 14,
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
  titleBranchName: {
    maxWidth: 190,
    textAlign: "right",
  },
});

export default SuccessScreen;
