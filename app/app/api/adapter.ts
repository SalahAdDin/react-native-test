import { PokemonDetail, Sprites, Type } from "../domain/pokemon.model";
import { isValidPokemonType } from "../domain/utils";

interface APIType {
  slot: number;
  type: { name: string; url: string };
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
  data.map(({ type }) => {
    if (!isValidPokemonType(type.name))
      throw new Error(`Invalid type: ${type.name}`);

    const id = type.url.split("/").at(-2);

    return { ...type, id } as unknown as Type;
  });

export const adaptPokemon = (data: any): PokemonDetail => ({
  id: data.id,
  name: data.name,
  order: data.order,
  height: data.height,
  sprites: adaptSprites(data.sprites),
  types: adaptTypes(data.types),
});
