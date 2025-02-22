import PokemonTile from "@/app/components/PokemonTile";
import { PokemonDetail } from "@/app/domain/pokemon.model";
import usePokemons from "@/app/hooks/usePokemons";
import { sortObjectsByKey } from "@/utils";
import { useState, useEffect } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { Text } from "react-native-ui-lib";

const PokeList = () => {
  const [favorites, setFavorites] = useState<Array<PokemonDetail>>([]);
  const [nonFavorites, setNonFavorites] = useState<Array<PokemonDetail>>([]);

  const { data: pokemons } = usePokemons();

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
      <View style={styles.column}>
        <Text text40BO center>
          No favoritos
        </Text>
        <FlatList
          data={nonFavorites}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <PokemonTile pokemon={item} onPress={toggleFavorite} />
          )}
        />
      </View>
      <View style={styles.column}>
        <Text text40BO center>
          Favoritos
        </Text>
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <PokemonTile pokemon={item} onPress={toggleFavorite} />
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, flexDirection: "row", padding: 20, gap: 20 },
  column: { flex: 1, margin: 10, gap: 20 },
  center: {
    textAlign: "center",
  },
});

export default PokeList;
