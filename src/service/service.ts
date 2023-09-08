import type {
  FindFalconRequestBody,
  FindFalconSuccess,
} from "../types/service";

import AxiosInstance from "../utils/axios";

const getToken = async () => {
  const response = await AxiosInstance.post(
    "token",
    {},
    {
      headers: {
        Accept: "application/json",
      },
    }
  );
  return response.data as Token;
};

const getPlanets = async () => {
  const response = await AxiosInstance.get("planets");
  return response.data as Planet[];
};

const getVehicles = async () => {
  const response = await AxiosInstance.get("vehicles");
  return response.data as Vehicle[];
};

const findFalcon = async (body: FindFalconRequestBody) => {
  try {
    const response = await AxiosInstance.post("find", body);
    return response.data as FindFalconSuccess;
  } catch (error) {}
};

export { getToken, findFalcon, getPlanets, getVehicles };
