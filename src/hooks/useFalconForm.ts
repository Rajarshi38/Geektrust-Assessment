import { useFormContext } from "react-hook-form";
import { FormInputs } from "../types";

export const useFalconForm = () => {
  const methods = useFormContext<FormInputs>();
  return methods;
}