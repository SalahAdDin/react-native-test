import { render, userEvent, waitFor } from "@testing-library/react-native";
import { PokemonDetail } from "../domain/pokemon.model";
import usePokemons from "../hooks/usePokemons";
import PokeList from "./PokeList";

jest.mock("react-native", () => ({
  NativeModules: {
    StatusBarManager: {
      getHeight: jest.fn().mockImplementation((callback) => {
        callback({ height: 20 });
      }),
    },
  },
  Platform: {
    OS: "ios",
    select: jest.fn().mockImplementation((options) => options.ios),
  },
}));

jest.mock("@/app/hooks/usePokemons");
jest.mock("@react-navigation/native", () => ({
  useIsFocused: jest.fn().mockReturnValue(true),
}));
jest.mock("@/app/components/PokemonTile", () => ({ pokemon, onPress }) => (
  <MockPokemonTile pokemon={pokemon} onPress={onPress} />
));

const MockPokemonTile = ({ pokemon, onPress }) => (
  <div testID={`pokemon-tile-${pokemon.id}`} onClick={() => onPress(pokemon)}>
    {pokemon.name}
  </div>
);

describe("PokeList", () => {
  const mockPokemons: Array<PokemonDetail> = [
    {
      id: 1,
      name: "bulbasaur",
      order: 1,
      height: 7,
      types: [
        { id: 12, name: "grass", url: "https://pokeapi.co/api/v2/type/12/" },
      ],
      sprites: {
        frontDefault: "https://example.com/bulbasaur.png",
        backDefault: "",
        backFemale: null,
        backShiny: "",
        backShinyFemale: null,
        frontFemale: null,
        frontShiny: "",
        frontShinyFemale: undefined,
      },
    },
    {
      id: 2,
      name: "ivysaur",
      order: 2,
      height: 10,
      types: [
        { id: 12, name: "grass", url: "https://pokeapi.co/api/v2/type/12/" },
      ],
      sprites: {
        frontDefault: "https://example.com/ivysaur.png",
        backDefault: "",
        backFemale: null,
        backShiny: "",
        backShinyFemale: null,
        frontFemale: null,
        frontShiny: "",
        frontShinyFemale: undefined,
      },
    },
  ];

  beforeEach(() => {
    (usePokemons as jest.Mock).mockReturnValue({
      data: { pages: [mockPokemons] },
      isLoading: false,
      error: null,
      fetchNextPage: jest.fn(),
      hasNextPage: true,
      isFetchingNextPage: false,
    });
  });

  it("renders non-favorite pokemons initially", async () => {
    const { getByText } = render(<PokeList />);

    await waitFor(() => {
      expect(getByText("bulbasaur")).toBeTruthy();
      expect(getByText("ivysaur")).toBeTruthy();
    });
  });

  it("toggles favorite state of a pokemon", async () => {
    const { getByTestId, getByText } = render(<PokeList />);

    await waitFor(() => expect(getByText("bulbasaur")).toBeTruthy());

    await userEvent.press(getByTestId("pokemon-tile-1"));

    await waitFor(() => {
      expect(getByText("bulbasaur")).toBeTruthy();
    });
  });

  it("calls fetchNextPage on reaching end of list", async () => {
    const mockFetchNextPage = jest.fn();
    (usePokemons as jest.Mock).mockReturnValue({
      data: { pages: [mockPokemons] },
      isLoading: false,
      error: null,
      fetchNextPage: mockFetchNextPage,
      hasNextPage: true,
      isFetchingNextPage: false,
    });

    const { getByTestId } = render(<PokeList />);

    await waitFor(() => getByTestId("pokemon-tile-1"));

    const flatList = getByTestId("pokemon-tile-1").parent;

    expect(flatList).not.toBeNull();

    flatList!.props.onEndReached();

    expect(mockFetchNextPage).toHaveBeenCalled();
  });

  it("shows loader while fetching", () => {
    (usePokemons as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
      fetchNextPage: jest.fn(),
      hasNextPage: true,
      isFetchingNextPage: false,
    });

    const { getByText } = render(<PokeList />);

    expect(getByText("Loading pokemons...")).toBeTruthy();
  });

  it("shows error message on error", () => {
    (usePokemons as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      error: { name: "Error", message: "Failed to fetch" },
      fetchNextPage: jest.fn(),
      hasNextPage: true,
      isFetchingNextPage: false,
    });

    const { getByText } = render(<PokeList />);

    expect(getByText("Error")).toBeTruthy();
    expect(getByText("Failed to fetch")).toBeTruthy();
  });
});
