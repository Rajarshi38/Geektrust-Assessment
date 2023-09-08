export type FindFalconRequestBody = {
  token: string;
  planet_names: string[];
  vehicle_names: string[];
};

export type FindFalconSuccess = {
  status: "success" | "false";
  planet_name: string;
};

type FindFalconFailed = Omit<FindFalconSuccess, "planet_name">;
