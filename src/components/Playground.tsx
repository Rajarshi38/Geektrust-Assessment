import { useRef } from "react";
import { usePlanets } from "../hooks/usePlanets";
import { useVehicles } from "../hooks/useVehicles";
import Autocomplete from "./Autocomplete";
import { PrimaryButton, SecondaryButton } from "./Buttons/Button";
import Loader from "./Loader/Loader";

const destinationInputs = [
  {
    id: 1,
    label: "Destination 1",
    name: "destination-one",
    placeholder: "Enter planet no 1",
  },
  {
    id: 2,
    label: "Destination 2",
    name: "destination-two",
    placeholder: "Enter planet no 2",
  },
  {
    id: 3,
    label: "Destination 3",
    name: "destination-three",
    placeholder: "Enter planet no 3",
  },
  {
    id: 4,
    label: "Destination 4",
    name: "destination-four",
    placeholder: "Enter planet no 4",
  },
];

const Playground = () => {
  const { planets, isLoading: isPlanetsLoading } = usePlanets();
  const { vehicles, isLoading: isVehiclesLoading } = useVehicles();
  const formRef = useRef<HTMLFormElement>(null);

  if (isPlanetsLoading && isVehiclesLoading) {
    return (
      <div className="text-center mt-24">
        <Loader />
      </div>
    );
  }

  return (
    <div className="text-white my-10 mx-auto p-8">
      <form
        className="mx-auto flex flex-col lg:flex-row items-center gap-8"
        ref={formRef}
      >
        {/* <div className="flex flex-col lg:flex-row gap-8 flex-wrap"> */}
        {destinationInputs.map((input) => (
          <Autocomplete
            key={input.id}
            label={input.label}
            placeholder={input.placeholder}
            name={input.name}
            planets={planets!}
          />
        ))}
        {/* </div> */}
        {/* <div className="flex flex-row gap-4">
          <SecondaryButton
            type="reset"
            className="px-6"
            onClick={() => resetFormValues()}
          >
            Reset
          </SecondaryButton>
          <PrimaryButton type="submit">Submit</PrimaryButton>
        </div> */}
      </form>
    </div>
  );
};

export default Playground;
