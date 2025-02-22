import { useIsFocused } from "@react-navigation/native";
import { useInfiniteQuery } from "@tanstack/react-query";
import { renderHook } from "@testing-library/react-native";
import { fetchPokemons } from "../api/service";
import usePokemons from "./usePokemons";

jest.mock("@tanstack/react-query", () => ({
  useInfiniteQuery: jest.fn(),
}));

jest.mock("@react-navigation/native", () => ({
  useIsFocused: jest.fn(),
}));

jest.mock("../api/service", () => ({
  fetchPokemons: jest.fn(),
}));

describe("usePokemons", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useIsFocused as jest.Mock).mockReturnValue(true);
  });

  it("returns query data correctly", () => {
    const mockData = {
      pages: [[{ id: 1, name: "bulbasaur" }]],
      pageParams: [0],
    };

    (useInfiniteQuery as jest.Mock).mockReturnValue({
      data: mockData,
      error: null,
      isLoading: false,
      fetchNextPage: jest.fn(),
      hasNextPage: true,
      isFetchingNextPage: false,
    });

    const { result } = renderHook(() => usePokemons());

    expect(result.current.data).toEqual(mockData);
    expect(result.current.error).toBeNull();
    expect(result.current.isLoading).toBe(false);
    expect(result.current.hasNextPage).toBe(true);
  });

  it("calls useInfiniteQuery with correct parameters", () => {
    renderHook(() => usePokemons());

    expect(useInfiniteQuery).toHaveBeenCalledWith({
      queryKey: ["pokemons"],
      queryFn: fetchPokemons,
      initialPageParam: 0,
      getNextPageParam: expect.any(Function),
      subscribed: true,
    });
  });

  it("handles loading state", () => {
    (useInfiniteQuery as jest.Mock).mockReturnValue({
      data: null,
      error: null,
      isLoading: true,
      fetchNextPage: jest.fn(),
      hasNextPage: false,
      isFetchingNextPage: false,
    });

    const { result } = renderHook(() => usePokemons());

    expect(result.current.isLoading).toBe(true);
  });

  it("handles error state", () => {
    const mockError = new Error("Failed to fetch");

    (useInfiniteQuery as jest.Mock).mockReturnValue({
      data: null,
      error: mockError,
      isLoading: false,
      fetchNextPage: jest.fn(),
      hasNextPage: false,
      isFetchingNextPage: false,
    });

    const { result } = renderHook(() => usePokemons());

    expect(result.current.error).toBe(mockError);
  });
});
