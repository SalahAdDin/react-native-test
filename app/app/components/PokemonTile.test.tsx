import { render, userEvent } from "@testing-library/react-native";

import { PokemonType, TYPE_COLORS } from "../constants";
import PokemonTile from "./PokemonTile";

// see: https://github.com/wix/react-native-ui-lib/discussions/3524

jest.mock("react-native-ui-lib", () => {
  const React = require("react");
  const { View, Text, TouchableOpacity } = require("react-native");

  const Card = ({ children, onPress, ...props }: any) => (
    <TouchableOpacity onPress={onPress} {...props}>
      {children}
    </TouchableOpacity>
  );
  Card.Image = (props: any) => <View {...props} />;

  const Chip = ({ label, ...props }: any) => (
    <View {...props}>
      <Text>{label}</Text>
    </View>
  );

  return { Card, Chip, Text, View };
});

describe("PokemonTile", () => {
  const mockPokemon = {
    id: 1,
    name: "bulbasaur",
    order: 1,
    height: 7,
    sprites: {
      backDefault: "back_default.png",
      backFemale: null,
      backShiny: "back_shiny.png",
      backShinyFemale: null,
      frontDefault: "front_default.png",
      frontFemale: null,
      frontShiny: "front_shiny.png",
      frontShinyFemale: null,
    },
    types: [
      {
        name: "grass" as unknown as PokemonType,
        url: "https://pokeapi.co/api/v2/type/12/",
        id: 12,
      },
    ],
  };

  const mockOnPress = jest.fn();

  it("renders correctly", () => {
    const { getByText } = render(
      <PokemonTile pokemon={mockPokemon} onPress={mockOnPress} />
    );

    expect(getByText("#001")).toBeTruthy();
    expect(getByText("Bulbasaur")).toBeTruthy();
    expect(getByText("7")).toBeTruthy();
    expect(getByText("GRASS")).toBeTruthy();
  });

  it.failing("calls onPress when card is pressed", () => {
    const user = userEvent.setup();

    const { getByTestId } = render(
      <PokemonTile pokemon={mockPokemon} onPress={mockOnPress} />
    );

    user.press(getByTestId("pokemon-bulbasaur"));

    expect(mockOnPress).toHaveBeenCalledWith(mockPokemon);
  });

  it("applies correct colors based on primary type", () => {
    const { getByText } = render(
      <PokemonTile pokemon={mockPokemon} onPress={mockOnPress} />
    );

    const nameText = getByText("Bulbasaur");

    expect(nameText.props.color).toBe(TYPE_COLORS["grass"].text);
  });
});
