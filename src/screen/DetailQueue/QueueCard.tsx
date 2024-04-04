import React, { useCallback, useMemo, useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Button, SectionMenu, Text } from "../../components";
import PopUpPesanAntrian from "./PopUpPesanAntrian";
import { SceneMap } from "react-native-tab-view";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { getData } from "../../services";
import { MenuProps, ScreenRouteProp } from "../../types";

import ServiceMenu from "./ServiceMenu";
import { getColor } from "../../utils";
import ArrrowRight from "../../components/svg/ArrowRight";
import { useRoute } from "@react-navigation/native";
import { useSelector } from "../../redux";

type UserAntrianType = "cs" | "teller";

interface AntrianProps {
  branchId: number;
}

interface QueueListProps {
  queueId: number;
  queueNumber: number;
  onServing: boolean;
  needs: string;
  estimatedTime: string;
  queueDate: string;
  secondChance: boolean;
  status: string;
  user: BranchDataUserProps;
  branch: BranchDataBranchProps;
}

interface BranchDataUserProps {
  userId: number;
  name: string;
  email: string;
  userType: string;
}

interface BranchDataBranchProps {
  branchId: string;
  branchName: string;
  address: string;
  longitude: number;
  latitude: number;
  subDistrict: string;
  city: string;
  province: string;
  urlString: string;
}

interface BranchDataProps {
  active_operator: number;
  current_queue: number;
  last_queue: number;
  queueList: QueueListProps[];
}

const LIST_SERVICES = ["teller", "cs"];

const QueueCard = ({ branchId }: AntrianProps) => {
  const [indexMenu, setIndexMenu] = useState(0);
  const insets = useSafeAreaInsets();

  const [service, setService] = useState<UserAntrianType>("cs");

  const [branchData, setBranchData] = useState<BranchDataProps>();

  const route = useRoute<ScreenRouteProp<"DetailKC">>()

  const {userType} = useSelector(state => state.userType)

  const buttonMenu = useMemo<MenuProps<UserAntrianType>[]>(
    () => [
      {
        key: "teller",
        title: "Teller",
      },
      {
        key: "cs",
        title: "Customer Service",
      },
    ],
    []
  );

  const fetchData = useCallback(async () => {
    getData<undefined, BranchDataProps>(
      `/queue-api/v1/queue-system/get-queue/branch/${branchId}/${buttonMenu[indexMenu].key}`,
      undefined,
      {
        onSuccess(data) {
          setBranchData(data.data)
          console.log("data", data);
        },
        onError(error) {
          console.log("error", error);
        },
      }
    );
  }, [branchId, buttonMenu, indexMenu]);

  useEffect(() => {

    fetchData();
  }, [fetchData]);

  const [showModal, setShowModal] = useState(false);

  const csServiceMenu = useCallback(() => {
    return <ServiceMenu branchId={branchId} needs="cs" branchName={""} />;
  }, [branchId]);

  const tellerServiceMenu = useCallback(() => {
    return <ServiceMenu branchId={branchId} needs="teller" branchName={""} />;
  }, [branchId]);

  const getServiceMenu = useMemo(() => {
    return SceneMap<UserAntrianType>({
      cs: csServiceMenu,
      teller: tellerServiceMenu,
    });
  }, [csServiceMenu, tellerServiceMenu]);

  return (
    <>
      {branchData && (
        <PopUpPesanAntrian
          onClose={() => setShowModal(false)}
          visible={showModal}
          currentQueue={branchData.current_queue}
          lastQueue={branchData.last_queue}
          branchId={branchId}
          needs={service}
        />
      )}

      <View style={[styles.container, { paddingBottom: insets.bottom }]}>
        <SectionMenu
          menu={buttonMenu}
          indexValue={indexMenu}
          onIndexChange={(value: number) => {
            setService(LIST_SERVICES[value] as UserAntrianType);
            setIndexMenu(value);
          }}
          renderedView={getServiceMenu}
        />

        <View style={styles.containerBawah}>
          <View style={styles.infoAntrianKamu}>
            <Text fontType="caption" fontWeight="bold">
              Antrian Kamu{" "}
              <Text fontType="caption" fontWeight="medium">
                dapat berubah sewaktu waktu apabila telah terambil oleh nasabah
                lain.
              </Text>
            </Text>
          </View>

          <Button
            textOptions={{
              color: "white",
              fontType: "body",
              fontWeight: "semibold",
            }}
            onPress={() => {
              console.log("called");
              setShowModal(true);
            }}
            style={{
              backgroundColor: getColor("darkOrange"),
            }}
            rightIconKey={<ArrrowRight />}
          >
            Selanjutnya
          </Button>
        </View>
      </View>
    </>
  );
};

export default QueueCard;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    flex: 1,
  },
  infoAntrianKamu: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 8,
    alignSelf: "stretch",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: getColor("darkOrange"),
    backgroundColor: getColor("lightOrange"),
  },
  containerBawah: {
    marginHorizontal: 20,
    gap: 16,
  },
});
