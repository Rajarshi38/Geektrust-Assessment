import { autocompleteTypes } from "../constants";
import { usePlanets } from "../hooks/usePlanets";
import { useVehicles } from "../hooks/useVehicles";
import { IMergedInputProps } from "../interface/MergedInput.interface";
import Autocomplete from "./Autocomplete";

const MergedInput = ({ index }: IMergedInputProps) => {
  const { planets } = usePlanets();
  const { vehicles } = useVehicles();
  return (
    <div className="flex flex-col gap-5 flex-1 border-2 border-red-500 p-6 pb-10 rounded-md">
      <h3 className="text-md lg:text-xl text-center">
        Choose Planet and Vehicle for #{index}
      </h3>
      <Autocomplete
        index={index}
        type={autocompleteTypes.planet}
        data={planets!}
      />
      <Autocomplete
        index={index}
        type={autocompleteTypes.vehicle}
        data={vehicles!}
      />
    </div>
  );
};

export default MergedInput;
