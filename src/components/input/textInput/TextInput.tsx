import React, { ComponentProps, ReactElement } from "react";
import { TextInput as NativeTextInput, StyleSheet, View } from "react-native";
import { Text } from "../../text";
import { getColor } from "../../../utils";

export type TextInputNativeProps = ComponentProps<typeof NativeTextInput>;

interface TextInputProps extends TextInputNativeProps {
  label?: string;
  rightButtonElement?: ReactElement;
  errorMessage?: string;
}

const TextInput = ({
  style,
  rightButtonElement,
  label,
  autoCapitalize = "none",
  errorMessage,
  ...props
}: TextInputProps) => {
  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          marginBottom: 8,
          justifyContent: "space-between",
        }}
      >
        {label && (
          <Text fontWeight="bold" fontType="caption">
            {label}
          </Text>
        )}
        {rightButtonElement}
      </View>

      <NativeTextInput
        {...props}
        autoCapitalize={autoCapitalize}
        style={StyleSheet.flatten([styles.input, style])}
      />

          
      {errorMessage && (
        <Text fontType="caption" color="errorMessage">
          {errorMessage}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
    fontSize: 12,
    borderRadius: 8,
    borderColor: getColor("grey300"),
    height: 44,
    color: getColor("black"),
  },
});

export default TextInput;
