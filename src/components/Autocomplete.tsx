import { useRef, useState } from "react";
import { usePlanets } from "../hooks/usePlanets";
import { IAutocompleteProps } from "../interface/Autocomplete.interface";

const Autocomplete = ({ label }: IAutocompleteProps) => {
  const [input, setInput] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const { planets } = usePlanets();
  const [suggestions, setSuggestions] = useState<Planet[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  //   useEffect(() => {
  //     const handleClickOutside = (event: MouseEvent) => {
  //       if (
  //         containerRef.current &&
  //         !containerRef.current.contains(event.target as Node)
  //       ) {
  //         setShowSuggestions(false);
  //       }
  //     };

  //     document.addEventListener("click", handleClickOutside);
  //     return () => document.removeEventListener("click", handleClickOutside);
  //   }, []);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setInput(value);
    if (value === "") {
      setShowSuggestions(false);
      setSuggestions([]);
    } else {
      setShowSuggestions(true);
      const filteredSuggestions = planets?.filter((planet) =>
        planet.name.toLowerCase().includes(value.toLowerCase())
      ) as Planet[];
      setSuggestions(filteredSuggestions);
    }
  };

  const onInputFocus = () => {
    setShowSuggestions(true);
    setSuggestions(planets!);
  };

  const suggestionOnClick = (event: React.MouseEvent<HTMLLIElement>) => {
    event.stopPropagation();
    setInput(event.currentTarget.innerText);
    setShowSuggestions(false);
  };

  return (
    <div className="flex flex-col gap-3 border-red-500" ref={containerRef}>
      <label className="text-gray-300 font-medium">{label}</label>
      <input
        className="text-slate-800 px-2 bg-slate-200 w-[350px] py-1 rounded-sm border-none outline-none focus-within:outline-red-300 outline-5 block"
        type="text"
        value={input}
        onChange={onChange}
        onFocus={onInputFocus}
      />
      {showSuggestions && (
        <ul
          className="bg-slate-200 w-[350px] overflow-auto text-slate-800 rounded-sm"
          ref={listRef}
        >
          {suggestions?.map((suggestion) => (
            <li
              key={suggestion.name}
              className="p-4 hover:bg-slate-600 rounded-sm hover:text-gray-300 transition ease-in-out duration-150"
              onClick={suggestionOnClick}
            >
              {suggestion.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Autocomplete;
