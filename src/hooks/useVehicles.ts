import useSWR from "swr";
import { QUERY_KEY } from "../constants";
import { getVehicles } from "../service/service";

export const useVehicles = () => {
  const { data, isLoading } = useSWR(QUERY_KEY.vehicles, getVehicles);
  return {
    vehicles: data,
    isLoading,
  };
};
