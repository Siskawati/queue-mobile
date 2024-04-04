import React, { useCallback, useEffect, useMemo, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import HomeBalance from "./HomeBalance";
import HomeHeader from "./HomeHeader";
import HomeProfile from "./HomeProfile";
import Offer from "./Offer";
import { MenuListProps } from "./HomeScreenTypes";
import HomeScreenIcon from "./HomeScreenIcon";
import {
  AntarBank,
  AntrianKc,
  CreditCard,
  DPLK,
  EWallet,
  GoPay,
  MenuLain,
  Pembayaran,
  Pembelian,
  SafeAreaView,
  ShopeePay,
  Subtract,
  TapCash,
} from "../../components";
import { postData } from "../../services";
import { decodeToken, getColor } from "../../utils";
import { OfficeService, ScreenProps } from "../../types";
import { useSelector } from "../../redux";
import AntrianInfoHomeModal from "../../components/modal/antrianInfoHome/AntrianInfoHomeModal";

interface DecodedAuthTokenProps {
  exp: number;
  sub: string;
  user_id: string;
  email: string;
}

interface VerifikasiEmailResponse {
  message: string;
  queue: Queue;
}

interface Queue {
  branch: Branch;
  lastUpdateTime: string;
  needs: string;
  onServing: boolean;
  operator: any;
  queueDate: string;
  queueId: string;
  queueNumber: number;
  secondChance: boolean;
  status: string;
  user: User;
}

interface Branch {
  address: string;
  branchId: number;
  branchName: string;
  city: string;
  latitude: number;
  longitude: number;
  province: string;
  subDistrict: string;
  urlString: string;
}

interface User {
  email: string;
  name: string;
  userId: string;
  userType: string;
}

interface VerifikasiEmailResponse {
  message: string;
  queue: Queue;
}
interface VerifikasiEmailBody {
  email: string;
}

const Home = ({ route }: ScreenProps<"HomeScreen">) => {
  const navigation = useNavigation();

  const [antrianData, setAntrianData] = useState<VerifikasiEmailResponse>();

  const selector = useSelector((state) => state.auth);

  const menuElement: MenuListProps[] = useMemo(() => {
    return [
      {
        text: "Transfer",
        element: <Subtract />,
        onClick: () => null,
      },
      {
        text: "E-Wallet",
        element: <EWallet />,
        onClick: () => null,
      },
      {
        text: "Pembayaran",
        element: <Pembayaran />,
        onClick: () => null,
      },
      {
        text: "Pembelian",
        element: <Pembelian />,
        onClick: () => null,
      },
      {
        text: "TapCash",
        element: <TapCash />,
        onClick: () => null,
      },
      {
        text: "DPLK/Simfoni",
        element: <DPLK />,
        onClick: () => null,
      },
      {
        text: "My Credit Card",
        element: <CreditCard />,
        onClick: () => null,
      },
      {
        text: "Antrian KC",
        element: <AntrianKc />,
        onClick: () => {
          navigation.navigate("LokasiKCScreen");
        },
      },
      {
        text: "ShopeePay",
        element: <ShopeePay />,
        onClick: () => null,
      },
      {
        text: "GoPay",
        element: <GoPay />,
        onClick: () => null,
      },
      {
        text: "Antarbank",
        element: <AntarBank />,
        onClick: () => null,
      },
      {
        text: "Menu Lain",
        element: <MenuLain />,
        onClick: () => null,
      },
    ];
  }, [navigation]);

  const verifyEmail = useCallback(() => {
    if (selector.token) {
      const decodedToken = decodeToken<DecodedAuthTokenProps>(selector.token);

      console.log("decoded token", decodedToken);
      postData<VerifikasiEmailBody, VerifikasiEmailResponse>(
        "/queue-api/v1/queue-system/check-queue",
        { email: decodedToken.email },
        {
          onError: (error) => {
            console.log("Belum Punya Antrian:", error);
          },
          onSuccess: (data) => {
            console.log("Verification response:", data.data);
            if (data.status === 200) {
              console.log("data.data.queueNumber", data.data.queue.queueNumber);
              setAntrianData(data.data);
            } else {
              console.log("Error verifying email");
            }
          },
        }
      );
    }
  }, [selector.token]);

  useEffect(() => {
    console.log("Running verifyEmail");
    verifyEmail();
  }, [verifyEmail]);

  return (
    <SafeAreaView style={styles.container}>
      {antrianData && (
        <AntrianInfoHomeModal
          onClose={() => setAntrianData(undefined)}
          visible
          queueDate={antrianData.queue.queueDate}
          branchName={antrianData.queue.branch.branchName}
          needs={antrianData.queue.needs.toUpperCase() as OfficeService}
          userId={antrianData.queue.user.userId}
          branchId={antrianData.queue.branch.branchId}
          queueNumber={antrianData.queue.queueNumber}
        />
      )}
      <FlatList
        ListHeaderComponent={
          <>
            <HomeHeader />
            <HomeProfile />
            <HomeBalance />
          </>
        }
        ListFooterComponent={<Offer />}
        data={menuElement}
        style={styles.flatlist}
        keyExtractor={(_item, index) => index.toString()}
        renderItem={(item) => <HomeScreenIcon {...item.item} />}
        contentContainerStyle={styles.flatlistContent}
        columnWrapperStyle={styles.flatlistColumn}
        numColumns={4}
      />
     
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    paddingLeft: 14,
    paddingRight: 14,
    flex: 1,
  },

  flatlist: {
    marginTop: 8,
  },

  flatlistContent: {
    gap: 30,
  },

  flatlistColumn: {
    gap: 10,
  },
  
});
