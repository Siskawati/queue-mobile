import { render, screen } from "@testing-library/react-native";

import Image from "./Image";

test("should render the image", () => {
  render(<Image image="bni" />);
  expect(screen.getByTestId("image")).toBeTruthy();
});
