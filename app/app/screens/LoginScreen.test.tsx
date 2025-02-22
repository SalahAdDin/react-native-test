import auth from "@react-native-firebase/auth";
import { render, userEvent, waitFor } from "@testing-library/react-native";

import LoginScreen from "./LoginScreen";

const mockSignIn = jest.fn();

jest.mock("@react-native-firebase/auth", () => ({
  __esModule: true,
  default: jest.fn(() => ({
    signInWithEmailAndPassword: mockSignIn,
  })),
}));

describe("LoginScreen", () => {
  const mockSignIn = jest.fn();

  beforeEach(() => {
    (auth as unknown as jest.Mock).mockReturnValue({
      signInWithEmailAndPassword: mockSignIn,
    });
  });

  it("renders correctly", () => {
    const { getByPlaceholderText, getByText } = render(<LoginScreen />);

    expect(getByPlaceholderText("Email")).toBeTruthy();
    expect(getByPlaceholderText("Password")).toBeTruthy();
    expect(getByText("Login")).toBeTruthy();
  });

  it("allows the user to fill out and submit the form", async () => {
    const user = userEvent.setup();

    const { getByPlaceholderText, getByText } = render(<LoginScreen />);

    const emailInput = getByPlaceholderText("Email");
    const passwordInput = getByPlaceholderText("Password");
    const loginButton = getByText("Login");

    await user.type(emailInput, "test@example.com");
    await user.type(passwordInput, "password123");

    await user.press(loginButton);

    await waitFor(() => {
      expect(mockSignIn).toHaveBeenCalledWith(
        "test@example.com",
        "password123"
      );
    });
  });

  it("displays an error message on login failure", async () => {
    mockSignIn.mockRejectedValueOnce(new Error("Invalid credentials"));

    const user = userEvent.setup();

    const { getByPlaceholderText, getByText, findByText } = render(
      <LoginScreen />
    );

    const emailInput = getByPlaceholderText("Email");
    const passwordInput = getByPlaceholderText("Password");
    const loginButton = getByText("Login");

    await user.type(emailInput, "test@example.com");
    await user.type(passwordInput, "wrongpassword");

    await user.press(loginButton);

    expect(await findByText("Invalid credentials")).toBeTruthy();
  });
});
