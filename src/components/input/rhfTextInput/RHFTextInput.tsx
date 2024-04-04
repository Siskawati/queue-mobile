import React, { ComponentProps } from "react";
import {
  Control,
  Controller,
  FieldPath,
  FieldValues,
  UseControllerProps,
} from "react-hook-form";
import TextInput from "../textInput/TextInput";

interface RhfTextInputProps<T extends FieldValues>
  extends Partial<
    Omit<ComponentProps<typeof TextInput>, "value" | "onChangeText" | "onBlur">
  > {
  name: FieldPath<T>;
  control: Control<T>;
  rules?: UseControllerProps<T>["rules"];
}

const RHFTextInput = <T extends FieldValues>({
  control,
  name,
  rules,
  ...props
}: RhfTextInputProps<T>) => {
  return (
    <Controller
      name={name}
      rules={rules}
      render={({
        field: { onChange, onBlur, value },
        formState: { errors },
      }) => (
        <TextInput
          onBlur={onBlur}
          onChangeText={onChange}
          value={value}
          errorMessage={errors[name]?.message?.toString()}
          {...props}
        />
      )}
      control={control}
    />
  );
};

export default RHFTextInput;
