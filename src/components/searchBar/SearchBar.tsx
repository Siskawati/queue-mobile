import {
  Pressable,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { CloseCircle, SearchBlack, SearchGrey } from "../svg";
import { getColor } from "../../utils";
import { useState } from "react";

interface SearchBarProps {
  onFocusChange: (focused: boolean) => void;
}

const SearchBar = ({ onFocusChange }: SearchBarProps) => {
  const [searchText, setSearchText] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const clearSearchText = () => {
    setSearchText("");
  };

  const handleFocusChange = (focused: boolean) => {
    setIsFocused(focused);
    onFocusChange(focused)

  }

  return (
    <View
      style={[
        styles.searchBar,
        {
          borderColor: isFocused ? getColor("black") : getColor("grey200"),
        },
      ]}
    >
      {/* Make bold search bar when user hovering and typing  */}
      <TouchableOpacity>
        {isFocused ? <SearchBlack /> : <SearchGrey />}
      </TouchableOpacity>
      <TextInput
        style={styles.textInputSearch}
        placeholder="Cari Lokasi Kantor BNI"
        placeholderTextColor={getColor("grey400")}
        value={searchText}
        onChangeText={(text) => setSearchText(text)}
        onFocus={() => handleFocusChange(true)}
        onBlur={() => handleFocusChange(false)}
      />
      {searchText !== "" && (
        <Pressable onPress={() => clearSearchText()}>
          <CloseCircle />
        </Pressable>
      )}
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  searchBar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    flex: 1,
    // height: 44,
    paddingVertical: 10,
    paddingHorizontal: 14,
    alignItems: "center",
    gap: 8,
    flexShrink: 0,
    borderRadius: 12,
    borderWidth: 1,
    minHeight: 39,
    maxHeight: 44,
  },
  textInputSearch: {
    flex: 1,
  },
});
