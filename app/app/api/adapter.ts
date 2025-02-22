import { PokemonDetail, Sprites, Type } from "../domain/pokemon.model";

interface APIType {
  slot: number;
  type: Type;
}

export const adaptSprites = (data: any): Sprites => ({
  backDefault: data.back_default,
  backFemale: data.back_female,
  backShiny: data.back_shiny,
  backShinyFemale: data.back_shiny_female,
  frontDefault: data.front_default,
  frontFemale: data.front_female,
  frontShiny: data.front_shiny,
  frontShinyFemale: data.front_shiny_female,
});

export const adaptTypes = (data: Array<APIType>) =>
  data.map(({ type }) => type);

export const adaptPokemon = (data: any): PokemonDetail => ({
  id: data.id,
  name: data.name,
  order: data.order,
  sprites: adaptSprites(data.sprites),
  types: adaptTypes(data.types),
});
