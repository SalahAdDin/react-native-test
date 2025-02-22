import React from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { Block, Card, Text, Button } from "galio-framework";
import { PokemonDetail } from "../domain/pokemon.model";
import { TYPE_COLORS } from "../constants";

interface PokemonTileProps {
  pokemon: PokemonDetail;
  onPress: (pokemon: PokemonDetail) => void;
}

const PokemonTile: React.FC<PokemonTileProps> = ({ pokemon, onPress }) => {
  const primaryType = pokemon.types[0].name || "normal";
  const bgColor = TYPE_COLORS[primaryType] || "#A8A77A";

  return (
    <TouchableOpacity onPress={() => onPress(pokemon)}>
      <Card
        flex
        borderless
        shadow
        style={{ backgroundColor: bgColor, borderRadius: 10, padding: 10 }}
      >
        <Block>
          <Text bold size={20} color="white">
            {pokemon.name}
          </Text>
          <Text size={14} color="white" style={{ opacity: 0.7 }}>
            #{pokemon.id.toString().padStart(3, "0")}
          </Text>
        </Block>
        <Image
          source={{ uri: pokemon.sprites.frontDefault }}
          style={{ width: 80, height: 80, alignSelf: "center" }}
        />
        <Block row center space="evenly" style={{ marginTop: 10 }}>
          {pokemon.types.map((type) => (
            <Button
              key={type.id}
              small
              color="white"
              textStyle={{ color: "black" }}
            >
              {type.name}
            </Button>
          ))}
        </Block>
      </Card>
    </TouchableOpacity>
  );
};

export default PokemonTile;
