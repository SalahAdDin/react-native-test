import { POKEMON_TYPE, PokemonType } from "../constants";

export const isValidPokemonType = (type: string): type is PokemonType => {
  return POKEMON_TYPE.includes(type as PokemonType);
};
