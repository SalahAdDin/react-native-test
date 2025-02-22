import { POKEMON_TYPE } from "../constants";
import { isValidPokemonType } from "./utils";

describe("utils", () => {
  describe("isValidPokemonType", () => {
    it("should return true for valid pokemon types", () => {
      POKEMON_TYPE.forEach((type) => {
        expect(isValidPokemonType(type)).toBe(true);
      });
    });

    it("should return false for invalid pokemon types", () => {
      expect(isValidPokemonType("invalidType")).toBe(false);
      expect(isValidPokemonType("")).toBe(false);
      expect(isValidPokemonType("firee")).toBe(false);
    });
  });
});
