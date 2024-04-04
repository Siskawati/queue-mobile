import React, { useEffect, useRef } from "react";
import {
  View,
  FlatList,
  Animated,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  StyleProp,
  ViewStyle,
} from "react-native";

import { Text, OfficeCard, ArrowLeft } from "../../components";
import { getColor } from "../../utils";
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { SearchBar } from "../../components/searchBar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LokasiKCScreenParams, RootStackParamList, ScreenProps, ScreenRouteProp } from "../../types";
import { useSelector } from "../../redux";

interface Branch {
  branchId: number;
  branchName: string;
  address: string;
  distance: number;
  latitude: number;
  longitude: number;
}

interface ListLocationsProps {
  data: Branch[];
  isListExpanded: boolean;
  onSearchBarClick: () => void;
  onBackPress: () => void;
  onIconPress: (latitude: number, longitude: number) => void;
  style?: StyleProp<ViewStyle>;
}

const ListLocations = ({
  data,
  isListExpanded,
  onSearchBarClick,
  onBackPress,
  onIconPress,
  style,
}: ListLocationsProps) => {
  const navigation = useNavigation();
  const translateY = useRef(new Animated.Value(0)).current;
  const insets = useSafeAreaInsets();
  const route = useRoute<ScreenRouteProp<"LokasiKCScreen">>()

  const {userType} = useSelector(state => state.userType)

  useEffect(() => {
    Animated.spring(translateY, {
      toValue: isListExpanded ? 0 : Dimensions.get("screen").height / 2,
      useNativeDriver: true,
    }).start();
  }, [isListExpanded, translateY]);

  useFocusEffect(
    React.useCallback(() => {
      const onFocusChange = () => {
        navigation.setOptions({
          headerShown: isListExpanded ? false : true,
        });
      };

      onFocusChange();
      navigation.addListener("focus", onFocusChange);

      return () => {
        navigation.removeListener("focus", onFocusChange);
      };
    }, [navigation, isListExpanded])
  );

  return (
    <Animated.View
      style={[
        styles.container,
        { transform: [{ translateY }] },
        isListExpanded && { ...styles.expanded, paddingTop: insets.top },
        style,
      ]}
    >
      {!isListExpanded && (
        <View>
          <Text fontType="section" fontWeight="bold" color="darkOrange">
            Lokasi Kantor Cabang BNI Terdekat
          </Text>
        </View>
      )}
      <View style={styles.rowSearchBar}>
        {isListExpanded && (
          <TouchableOpacity onPress={onBackPress}>
            <ArrowLeft />
          </TouchableOpacity>
        )}
        <SearchBar onFocusChange={onSearchBarClick} />
      </View>

      <FlatList
        data={data}
        keyExtractor={(item) => item.branchId.toString()}
        ItemSeparatorComponent={() => (
          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: getColor("grey200"),
            }}
          />
        )}
        renderItem={({ item }) => (
          <OfficeCard
            {...item}
            onIconPress={onIconPress}
            onPress={() =>
              navigation.navigate("DetailKC", {
                address: item.address,
                branchId: item.branchId,
                branchName: item.branchName,
                latitude: item.latitude,
                longitude: item.longitude,
                distance: item.distance,
              })
            }
          />
        )}
      />
    </Animated.View>
  );
};

export default ListLocations;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: "100%",
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 20,
    height: "100%",
  },
  searchBar: {
    paddingVertical: 10,
  },
  expanded: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  rowSearchBar: {
    flexDirection: "row",
    display: "flex",
    height: 64,
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 16,
    borderBottomWidth: 1,
    borderBottomColor: getColor("grey200"),
    // backgroundColor: "slategray",
  },
});
