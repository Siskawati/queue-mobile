import { render, screen } from "@testing-library/react-native";

import Text from "./Text";

describe("Text", () => {
  test("should rendered properly", () => {
    render(<Text>test value</Text>);
    const target = screen.getByText("test value");
    expect(target).toBeTruthy();
  });
});
