export const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL;

export const POKEMON_TYPE = [
  "bug",
  "dark",
  "dragon",
  "electric",
  "fairy",
  "fighting",
  "fire",
  "flying",
  "ghost",
  "grass",
  "ground",
  "ice",
  "normal",
  "poison",
  "psychic",
  "rock",
  "steel",
  "stellar",
  "unknown",
  "water",
] as const;

export type PokemonType = (typeof POKEMON_TYPE)[number];

export const TYPE_COLORS: Record<PokemonType, string> = {
  bug: "#A6B91A",
  dark: "#705746",
  dragon: "#6F35FC",
  electric: "#F7D02C",
  fairy: "#D685AD",
  fighting: "#C22E28",
  fire: "#EE8130",
  flying: "#A98FF3",
  ghost: "#735797",
  grass: "#7AC74C",
  ground: "#E2BF65",
  ice: "#96D9D6",
  normal: "#A8A77A",
  poison: "#A33EA1",
  psychic: "#F95587",
  rock: "#B6A136",
  steel: "#B7B7CE",
  stellar: "#DA70D6",
  unknown: "#68A090",
  water: "#6390F0",
};
