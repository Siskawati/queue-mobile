import { render, screen } from "@testing-library/react-native";
import { Text } from "react-native";

import FontsProvider from "./FontsProvider";

beforeEach(() => {
  render(
    <FontsProvider>
      <Text>test</Text>
    </FontsProvider>
  );
});

jest.mock("@expo-google-fonts/montserrat", () => ({
  useFonts: jest
    .fn()
    .mockReturnValueOnce([true, false])
    .mockReturnValueOnce([false, true])
    .mockReturnValueOnce([false, false]),
}));

describe("fonts provider", () => {
  test("should render the children properly", async () => {
    const target = screen.getByText("test");
    expect(target).toBeTruthy();
  });

  test("should still render the child when the fonts are error", () => {
    const target = screen.getByText("test");
    expect(target).toBeTruthy();
  });

  test("should not render the child when the fonts not loaded", async () => {
    const target = await screen.queryByText("test");
    expect(target).toBeFalsy();
  });
});
