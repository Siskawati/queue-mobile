import { render, screen } from "@testing-library/react-native";
import React from "react";
import mockSafeAreaContext from "react-native-safe-area-context/jest/mock";

import SafeAreaView from "./SafeAreaView";
import Text from "../text/Text";

jest.mock("react-native-safe-area-context", () => mockSafeAreaContext);

test("component should render the children", () => {
  render(
    <SafeAreaView>
      <Text>test</Text>
    </SafeAreaView>
  );
  expect(screen.getByText("test")).toBeTruthy();
});
