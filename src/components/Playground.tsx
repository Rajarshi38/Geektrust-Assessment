import { usePlanets } from "../hooks/usePlanets";
import { useVehicles } from "../hooks/useVehicles";
import Autocomplete from "./Autocomplete";
import Loader from "./Loader/Loader";

const Playground = () => {
  const { planets, isLoading: isPlanetsLoading } = usePlanets();
  const { vehicles, isLoading: isVehiclesLoading } = useVehicles();

  if (isPlanetsLoading && isVehiclesLoading) {
    return (
      <div className="text-center mt-24">
        <Loader />
      </div>
    );
  }

  return (
    <div className="text-white my-10 mx-auto p-8">
      <form className="mx-auto flex flex-col items-center lg:flex-row gap-8">
        <Autocomplete label="Destination 1" />
        <Autocomplete label="Destination 2" />
        <Autocomplete label="Destination 3" />
        <Autocomplete label="Destination 4" />
      </form>
    </div>
  );
};

export default Playground;
