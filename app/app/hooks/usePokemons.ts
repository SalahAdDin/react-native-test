import { useIsFocused } from "@react-navigation/native";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchPokemons } from "../api/service";
import { ITEMS_PER_PAGE } from "../constants";
import { PokemonDetail } from "../domain/pokemon.model";

const usePokemons = () => {
  const isFocused = useIsFocused();

  const {
    data,
    error,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<Array<PokemonDetail>, Error>({
    queryKey: ["pokemons"],
    queryFn: fetchPokemons,
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) =>
      lastPage.length ? pages.length * ITEMS_PER_PAGE : undefined,
    subscribed: isFocused,
  });

  return {
    data,
    error,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };
};

export default usePokemons;
