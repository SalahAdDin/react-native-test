import { ITEMS_PER_PAGE } from "../constants";
import { adaptPokemon } from "./adapter";
import client from "./client";
import { fetchPokemons } from "./service";

jest.mock("./client");
jest.mock("./adapter");

const mockedClient = client as jest.Mocked<typeof client>;
const mockedAdaptPokemon = adaptPokemon as jest.Mock;

describe("service", () => {
  describe("fetchPokemons", () => {
    const mockPokemonListResponse = {
      data: {
        results: [
          { name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1/" },
          { name: "ivysaur", url: "https://pokeapi.co/api/v2/pokemon/2/" },
        ],
      },
    };

    const mockPokemonDetailResponse = (id: number) => ({
      data: { id, name: `pokemon-${id}` },
    });

    beforeEach(() => {
      mockedClient.get.mockReset();
      mockedAdaptPokemon.mockReset();
    });

    it("should fetch pokemons and adapt them", async () => {
      mockedClient.get.mockImplementation((url) => {
        if (url.startsWith("/?offset=")) {
          return Promise.resolve(mockPokemonListResponse);
        }
        if (url === "https://pokeapi.co/api/v2/pokemon/1/") {
          return Promise.resolve(mockPokemonDetailResponse(1));
        }
        if (url === "https://pokeapi.co/api/v2/pokemon/2/") {
          return Promise.resolve(mockPokemonDetailResponse(2));
        }
        return Promise.reject(new Error("Not Found"));
      });

      mockedAdaptPokemon.mockImplementation((data) => ({ adapted: data }));

      const result = await fetchPokemons({ pageParam: 0 });

      expect(mockedClient.get).toHaveBeenCalledWith(
        `/?offset=0&limit=${ITEMS_PER_PAGE}`
      );
      expect(mockedClient.get).toHaveBeenCalledWith(
        "https://pokeapi.co/api/v2/pokemon/1/"
      );
      expect(mockedClient.get).toHaveBeenCalledWith(
        "https://pokeapi.co/api/v2/pokemon/2/"
      );

      expect(mockedAdaptPokemon).toHaveBeenCalledTimes(2);
      expect(result).toEqual([
        { adapted: { id: 1, name: "pokemon-1" } },
        { adapted: { id: 2, name: "pokemon-2" } },
      ]);
    });

    it("should handle errors gracefully", async () => {
      mockedClient.get.mockRejectedValueOnce(new Error("API Error"));

      await expect(fetchPokemons({ pageParam: 0 })).rejects.toThrow(
        "API Error"
      );
    });
  });
});
