import { useFocusEffect } from "@react-navigation/native";
import { renderHook } from "@testing-library/react-native";
import { useRefreshOnFocus } from "./useRefreshOnFocus";

jest.mock("@react-navigation/native", () => ({
  useFocusEffect: jest.fn().mockImplementation((callback) => callback()),
}));

describe("useRefreshOnFocus", () => {
  const mockRefetch = jest.fn().mockResolvedValue("refetched");

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("does not call refetch on initial render", () => {
    renderHook(() => useRefreshOnFocus(mockRefetch));

    expect(useFocusEffect).toHaveBeenCalled();
    expect(mockRefetch).not.toHaveBeenCalled();
  });

  it("calls refetch when focus effect runs after first render", () => {
    const { rerender } = renderHook(() => useRefreshOnFocus(mockRefetch));

    expect(mockRefetch).not.toHaveBeenCalled();

    // Simulate focus effect running again
    rerender({});

    expect(mockRefetch).toHaveBeenCalled();
  });
});
