import { fetchPokemons } from "../api/service";
import { useQuery } from "@tanstack/react-query";
import { PokemonDetail } from "../domain/pokemon.model";
import { useIsFocused } from "@react-navigation/native";

const usePokemons = () => {
  const isFocused = useIsFocused();

  const { data, error, isLoading } = useQuery<Array<PokemonDetail>, Error>({
    queryKey: ["pokemons"],
    queryFn: fetchPokemons,
    subscribed: isFocused,
  });

  return { data, error, isLoading };
};

export default usePokemons;
