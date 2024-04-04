import { render, screen, fireEvent } from "@testing-library/react-native";

import Button from "./Button";

describe("Button", () => {
  test("should rendered properly", () => {
    render(<Button>test</Button>);
    expect(screen.getByText("test")).toBeDefined();
  });

  test("should call the mock function", () => {
    const mockFunction = jest.fn();
    render(<Button onPress={mockFunction}>test</Button>);
    fireEvent.press(screen.getByText("test"), mockFunction);

    expect(mockFunction).toHaveBeenCalled();
  });
});
