import { isValidPokemonType } from "../domain/utils";
import { adaptPokemon, adaptSprites, adaptTypes } from "./adapter";

jest.mock("../domain/utils", () => ({
  isValidPokemonType: jest.fn().mockReturnValue(true),
}));

describe("adapters", () => {
  describe("adaptSprites", () => {
    it("should adapt sprites correctly", () => {
      const apiData = {
        back_default: "back_default.png",
        back_female: "back_female.png",
        back_shiny: "back_shiny.png",
        back_shiny_female: "back_shiny_female.png",
        front_default: "front_default.png",
        front_female: "front_female.png",
        front_shiny: "front_shiny.png",
        front_shiny_female: "front_shiny_female.png",
      };

      const expected = {
        backDefault: "back_default.png",
        backFemale: "back_female.png",
        backShiny: "back_shiny.png",
        backShinyFemale: "back_shiny_female.png",
        frontDefault: "front_default.png",
        frontFemale: "front_female.png",
        frontShiny: "front_shiny.png",
        frontShinyFemale: "front_shiny_female.png",
      };

      expect(adaptSprites(apiData)).toEqual(expected);
    });
  });

  describe("adaptTypes", () => {
    it("should adapt types correctly", () => {
      const apiData = [
        {
          slot: 1,
          type: { name: "fire", url: "https://pokeapi.co/api/v2/type/10/" },
        },
        {
          slot: 2,
          type: { name: "flying", url: "https://pokeapi.co/api/v2/type/3/" },
        },
      ];

      const expected = [
        { name: "fire", url: "https://pokeapi.co/api/v2/type/10/", id: "10" },
        { name: "flying", url: "https://pokeapi.co/api/v2/type/3/", id: "3" },
      ];

      expect(adaptTypes(apiData)).toEqual(expected);
    });

    it("should throw error on invalid type", () => {
      (isValidPokemonType as unknown as jest.Mock).mockReturnValue(false);

      const apiData = [
        {
          slot: 1,
          type: {
            name: "invalidType",
            url: "https://pokeapi.co/api/v2/type/999/",
          },
        },
      ];

      expect(() => adaptTypes(apiData)).toThrow("Invalid type: invalidType");
    });
  });

  describe("adaptPokemon", () => {
    beforeEach(() => {
      (isValidPokemonType as unknown as jest.Mock).mockReturnValue(true);
    });

    it("should adapt pokemon correctly", () => {
      const apiData = {
        id: 1,
        name: "bulbasaur",
        order: 1,
        height: 7,
        sprites: {
          back_default: "back_default.png",
          back_female: null,
          back_shiny: "back_shiny.png",
          back_shiny_female: null,
          front_default: "front_default.png",
          front_female: null,
          front_shiny: "front_shiny.png",
          front_shiny_female: null,
        },
        types: [
          {
            slot: 1,
            type: { name: "grass", url: "https://pokeapi.co/api/v2/type/12/" },
          },
        ],
      };

      const expected = {
        id: 1,
        name: "bulbasaur",
        order: 1,
        height: 7,
        sprites: {
          backDefault: "back_default.png",
          backFemale: null,
          backShiny: "back_shiny.png",
          backShinyFemale: null,
          frontDefault: "front_default.png",
          frontFemale: null,
          frontShiny: "front_shiny.png",
          frontShinyFemale: null,
        },
        types: [
          {
            name: "grass",
            url: "https://pokeapi.co/api/v2/type/12/",
            id: "12",
          },
        ],
      };

      expect(adaptPokemon(apiData)).toEqual(expected);
    });
  });
});
