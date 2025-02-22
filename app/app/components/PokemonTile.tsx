import React from "react";
import { StyleSheet } from "react-native";
import { Card, Chip, Text, View } from "react-native-ui-lib";
import { TYPE_COLORS } from "../constants";
import { PokemonDetail } from "../domain/pokemon.model";

interface PokemonTileProps {
  pokemon: PokemonDetail;
  onPress: (pokemon: PokemonDetail) => void;
}

const PokemonTile: React.FC<PokemonTileProps> = ({ pokemon, onPress }) => {
  const primaryType = pokemon.types[0].name || "normal";
  const bgColor = TYPE_COLORS[primaryType]?.base || TYPE_COLORS.unknown.base;
  const lightBgColor =
    TYPE_COLORS[primaryType]?.light || TYPE_COLORS.unknown.light;
  const textColor = TYPE_COLORS[primaryType]?.text || TYPE_COLORS.unknown.text;

  return (
    <Card
      onPress={() => onPress(pokemon)}
      flex
      marginB-10
      enableShadow
      backgroundColor={bgColor}
      borderRadius={15}
      row
    >
      <View flex padding-20>
        <View row spread centerV>
          <View row gap-10 centerV>
            <Text text60BO color={textColor}>
              #{pokemon.id.toString().padStart(3, "0")}
            </Text>
            <Text text50BO color={textColor}>
              {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
            </Text>
          </View>
          <Text text70BO marginT-5 color={textColor}>
            {pokemon.height}
          </Text>
        </View>
        <View row marginT-10 gap-5>
          {pokemon.types.map((type) => (
            <Chip
              key={`${pokemon.name}-${type.id}`}
              label={type.name.toUpperCase()}
              labelStyle={{ color: TYPE_COLORS[type.name].text, fontSize: 14 }}
              containerStyle={{
                borderColor: TYPE_COLORS[type.name].base,
                backgroundColor: TYPE_COLORS[type.name].light,
              }}
            />
          ))}
        </View>
      </View>

      <View style={[styles.imageContainer, { backgroundColor: lightBgColor }]}>
        <Card.Image
          source={{ uri: pokemon.sprites.frontDefault }}
          style={styles.image}
        />
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    width: 120,
    justifyContent: "center",
    alignItems: "center",
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    borderTopLeftRadius: 75,
    borderBottomLeftRadius: 75,
  },
  image: {
    width: 100,
    height: 100,
  },
});

export default PokemonTile;
