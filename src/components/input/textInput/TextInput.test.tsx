import { render, screen, fireEvent } from "@testing-library/react-native";

import TextInput from "./TextInput";

describe("Test Input", () => {
  test("Should rendered properly", () => {
    render(<TextInput placeholder="test" />);
    const testResponse = screen.getByPlaceholderText("test");
    expect(testResponse).toBeTruthy();
  });

  test("Should change the text value", () => {
    const mock = jest.fn();
    render(<TextInput placeholder="test" onChangeText={mock} />);
    fireEvent.changeText(screen.getByPlaceholderText("test"), "test edited");
    expect(mock).toHaveBeenCalledWith("test edited");
  });
});
