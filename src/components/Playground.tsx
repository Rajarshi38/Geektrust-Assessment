import { useRef } from "react";
import { usePlanets } from "../hooks/usePlanets";
import { useVehicles } from "../hooks/useVehicles";
import Loader from "./Loader/Loader";
import MergedInput from "./MergedInput";
import { useForm, FormProvider } from "react-hook-form";
import { FormInputs, IndexType } from "../types";

const inputs = [
  {
    index: 1,
  },
  {
    index: 2,
  },
  {
    index: 3,
  },
  {
    index: 4,
  },
];

const Playground = () => {
  const { isLoading: isPlanetsLoading } = usePlanets();
  const { isLoading: isVehiclesLoading } = useVehicles();
  const methods = useForm<FormInputs>();
  const formRef = useRef<HTMLFormElement>(null);

  if (isPlanetsLoading && isVehiclesLoading) {
    return (
      <div className="text-center mt-24">
        <Loader />
      </div>
    );
  }

  return (
    <div className="text-white my-10 p-8">
      <form ref={formRef}>
        <FormProvider {...methods}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {inputs.map((input) => (
              <MergedInput index={input.index as IndexType} key={input.index} />
            ))}
          </div>
        </FormProvider>
      </form>
    </div>
  );
};

export default Playground;
