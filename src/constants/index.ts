import { AutocompleteType } from "../types";

export const API_BASE_URL = "https://findfalcone.geektrust.com/";

export const QUERY_KEY = {
  planets: "planets",
  vehicles: "vehicles",
  token: "token",
};

export const autocompleteTypes: Record<AutocompleteType, AutocompleteType> = {
  planet: "planet",
  vehicle: "vehicle",
};
