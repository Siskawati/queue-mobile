import { render, screen } from "@testing-library/react-native";

import Icon from "./Icon";

test("should render the icon", () => {
  render(<Icon icon="boldWallet" />);
  expect(screen.getByTestId("icon")).toBeTruthy();
});
