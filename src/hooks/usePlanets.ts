import useSWR from "swr";
import { getPlanets } from "../service/service";
import { QUERY_KEY } from "../constants";

export const usePlanets = () => {
  const { data, isLoading } = useSWR(QUERY_KEY.planets, getPlanets);
  return { planets: data, isLoading };
};
