import { PokemonDetail, PokemonListResponse } from "../domain/pokemon.model";
import { adaptPokemon } from "./adapter";
import client from "./client";

export const fetchPokemons = async (): Promise<Array<PokemonDetail>> => {
  const response = await client.get<PokemonListResponse>("");

  const detailsPromises = response.data.results.map((pokemon) => {
    const pokemonId = pokemon.url.split("/")[-2];
    return client.get(pokemon.url);
  });

  const detailsResponses = await Promise.all(detailsPromises);

  return detailsResponses.map((pokemon) => adaptPokemon(pokemon.data));
};
