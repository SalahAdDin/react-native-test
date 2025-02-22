import { sortObjectsByKey } from "@/utils";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import usePokemons from "./hooks/usePokemons";
import { PokemonDetail } from "./domain/pokemon.model";

export default function HomeScreen() {
  const [favorites, setFavorites] = useState<Array<PokemonDetail>>([]);
  const [nonFavorites, setNonFavorites] = useState<Array<PokemonDetail>>([]);

  const { data: pokemons, error } = usePokemons();

  useEffect(() => {
    if (pokemons) {
      const organizedPokemons = sortObjectsByKey(pokemons, "height");
      setFavorites(organizedPokemons);
    }
  }, [pokemons]);

  return (
    <View style={styles.container}>
      <Text style={styles.center}>No favoritos</Text>
      {favorites.map((pokemon) => (
        <Text key={pokemon.id}>{pokemon.name}</Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    flex: 1,
  },
  center: {
    textAlign: "center",
  },
});
