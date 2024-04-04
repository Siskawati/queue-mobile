import React, { ComponentProps, ReactElement, isValidElement } from "react";
import { Pressable, StyleSheet } from "react-native";
import { getColor } from "../../utils";
import Text from "../text/Text";

type PressableProps = ComponentProps<typeof Pressable>;

type TextOptionsType = ComponentProps<typeof Text>;

export interface ButtonProps extends PressableProps {
  children: string | ReactElement;
  rightIconKey?: ReactElement;
  leftIconKey?: ReactElement;
  textOptions?: TextOptionsType;
}

const Button = ({
  children,
  style,
  rightIconKey,
  leftIconKey,
  textOptions,
  disabled,
  ...props
}: ButtonProps) => {
  return (
    <Pressable
      {...props}
      disabled={disabled}
      style={StyleSheet.flatten([
        styles.container,
        style,
        {
          opacity: disabled ? 0.7 : 1,
        },
      ])}
    >
      {leftIconKey}

      {isValidElement(children) ? (
        children
      ) : (
        <Text
          {...textOptions}
          style={StyleSheet.flatten([
            styles.text,
            textOptions?.style,
            {
              color: getColor(textOptions?.color ?? "black"),
            },
          ])}
        >
          {children}
        </Text>
      )}

      {rightIconKey}
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    columnGap: 8,
    backgroundColor: getColor("lightTeal"),
    borderRadius: 36,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },

  text: {
    textAlign: "center",
  },
});
