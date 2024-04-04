import { fireEvent, render, screen } from "@testing-library/react-native";

import Checkbox from "./Checkbox";

describe("Checkbox", () => {
  test("should rendered properly", () => {
    render(<Checkbox onValueChange={() => null} text="test" value />);

    expect(screen.getByText("test")).toBeTruthy();
    expect(screen.getByTestId("checkbox")).toBeTruthy();
  });

  test("should call onValueChange value", () => {
    let value = false;
    const mockFunction = jest.fn().mockImplementation(() => {
      value = !value;
    });
    render(<Checkbox onValueChange={mockFunction} text="test" value={value} />);
    fireEvent.press(screen.getByTestId("checkbox"));

    expect(mockFunction).toHaveBeenCalled();
    expect(value).toBeTruthy();
  });
});
