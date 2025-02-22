import { fetchPokemons } from "../api/service";
import { useQuery } from "@tanstack/react-query";
import { PokemonDetail } from "../domain/pokemon.model";

const usePokemons = () => {
  const { data, error, isLoading } = useQuery<Array<PokemonDetail>, Error>({
    queryKey: ["pokemons"],
    queryFn: fetchPokemons,
  });

  return { data, error, isLoading };
};

export default usePokemons;
