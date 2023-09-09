import { useVehicles } from "../hooks/useVehicles";
import { IndexType } from "../types";

const Select = ({ index }: { index: IndexType }) => {
  const { vehicles } = useVehicles();
  return vehicles ? (
    <div className="flex flex-col gap-3">
      <label>Select vehicle for destination {index}</label>
      <select
        id="countries"
        className="bg-slate-200 border border-none text-slate-800 text-sm rounded-sm focus:ring-2 ring-red-300 focus:border-red-500 block w-full p-2.5"
        placeholder=""
      >
        {vehicles.map((vehicle) => (
          <option key={vehicle.name} value={vehicle.name}>
            {vehicle.name}
          </option>
        ))}
      </select>
    </div>
  ) : null;
};

export default Select;
