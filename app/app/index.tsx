import { sortObjectsByKey } from "@/utils";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import usePokemons from "./hooks/usePokemons";
import { PokemonDetail } from "./domain/pokemon.model";
import PokemonTile from "./components/PokemonTile";

export default function HomeScreen() {
  const [favorites, setFavorites] = useState<Array<PokemonDetail>>([]);
  const [nonFavorites, setNonFavorites] = useState<Array<PokemonDetail>>([]);

  const { data: pokemons, error } = usePokemons();

  useEffect(() => {
    if (pokemons) {
      const organizedPokemons = sortObjectsByKey(pokemons, "height");
      setNonFavorites(organizedPokemons);
    }
  }, [pokemons]);

  const toggleFavorite = (pokemon: PokemonDetail) => {
    if (favorites.find((p) => p.id === pokemon.id)) {
      setFavorites(favorites.filter((p) => p.id !== pokemon.id));
      setNonFavorites(sortObjectsByKey([...nonFavorites, pokemon], "height"));
    } else {
      setNonFavorites(nonFavorites.filter((p) => p.id !== pokemon.id));
      setFavorites(sortObjectsByKey([...favorites, pokemon], "height"));
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.center}>No favoritos</Text>
      {favorites.map((pokemon) => (
        <PokemonTile
          key={pokemon.id}
          pokemon={pokemon}
          onPress={toggleFavorite}
        />
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
