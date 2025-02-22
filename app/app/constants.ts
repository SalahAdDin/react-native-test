export const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL;

export const ITEMS_PER_PAGE = 20;

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

export const TYPE_COLORS: Record<
  PokemonType,
  { base: string; light: string; text: string }
> = {
  bug: { base: "#A7D129", light: "#DDF293", text: "#4E6700" },
  dark: { base: "#5A5A5A", light: "#C2C2C2", text: "#F5F5F5" },
  dragon: { base: "#8A6BE0", light: "#D8C4FC", text: "#4C1D95" },
  electric: { base: "#F5D547", light: "#FFF3B0", text: "#7A4B00" },
  fairy: { base: "#F4A3B5", light: "#FFD1DC", text: "#902048" },
  fighting: { base: "#E95D5D", light: "#FFB0B0", text: "#A13232" },
  fire: { base: "#FF8C42", light: "#FFC999", text: "#B35929" },
  flying: { base: "#A3D5FF", light: "#E1F0FF", text: "#325D88" },
  ghost: { base: "#916DB3", light: "#D5BFF2", text: "#4F2675" },
  grass: { base: "#78C850", light: "#C6F1A6", text: "#386B1A" },
  ground: { base: "#E0B97E", light: "#F8E3C1", text: "#7F5539" },
  ice: { base: "#95DFF8", light: "#D1F6FF", text: "#256D85" },
  normal: { base: "#D5D5C3", light: "#F2F2E6", text: "#646464" },
  poison: { base: "#C089E8", light: "#E6C9FF", text: "#6A1B9A" },
  psychic: { base: "#FB6C9D", light: "#FFB6C1", text: "#A02B50" },
  rock: { base: "#C1B08C", light: "#E6DDC4", text: "#7A6A48" },
  steel: { base: "#A1A5B2", light: "#D5D8E0", text: "#525668" },
  stellar: { base: "#EBA8C3", light: "#FFD7EB", text: "#A04070" },
  unknown: { base: "#9099A1", light: "#D0D8E0", text: "#404952" },
  water: { base: "#5090D6", light: "#B3D9FF", text: "#1A447A" },
};
