import { AutocompleteType, IndexType } from "../types";

export interface IAutocompleteProps {
  index: IndexType;
  type: AutocompleteType;
  data: Planet[] | Vehicle[];
}
