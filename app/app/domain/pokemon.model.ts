export interface Sprites {
  backDefault: string;
  backFemale: string | null;
  backShiny: string;
  backShinyFemale: string | null;
  frontDefault: string;
  frontFemale: string | null;
  frontShiny: string;
  frontShinyFemale: any;
}

export interface Type {
  name: string;
  url: string;
}

export type Pokemon = {
  name: string;
  url: string;
};

export interface PokemonDetail {
  id: number;
  name: string;
  order: number;
  sprites: Sprites;
  types: Array<Type>;
  height: number;
}

export type PokemonListResponse = {
  count: number;
  next: string;
  previous: string;
  results: Array<Pokemon>;
};
