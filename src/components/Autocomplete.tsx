import { useEffect, useRef, useState } from "react";
import { usePlanets } from "../hooks/usePlanets";
import { IAutocompleteProps } from "../interface/Autocomplete.interface";

const Autocomplete = ({ label }: IAutocompleteProps) => {
  const [input, setInput] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const { planets } = usePlanets();
  const [suggestions, setSuggestions] = useState<Planet[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const suggestionsOpenRef = useRef<boolean>(showSuggestions);

  suggestionsOpenRef.current = showSuggestions;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  useEffect(() => {
    const pressedEscape = (e: KeyboardEvent) => {
      if (
        suggestionsOpenRef.current &&
        (e.key === "Escape" || e.key === "Tab")
      ) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("keydown", pressedEscape);

    return () => {
      document.removeEventListener("keydown", pressedEscape);
    };
  }, []);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setInput(value);

    setShowSuggestions(true);
    const filteredSuggestions = planets?.filter((planet) =>
      planet.name.toLowerCase().includes(value.toLowerCase())
    ) as Planet[];
    setSuggestions(filteredSuggestions);
  };

  const onInputFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (value === "") setSuggestions(planets!);
    else {
      const filteredSuggestions = planets?.filter((planet) =>
        planet.name.toLowerCase().includes(value.toLowerCase())
      ) as Planet[];
      setSuggestions(filteredSuggestions);
    }

    setShowSuggestions(true);
  };

  const suggestionOnClick = (event: React.MouseEvent<HTMLLIElement>) => {
    event.stopPropagation();
    setInput(event.currentTarget.innerText);
    setShowSuggestions(false);
  };

  return (
    <div
      className="flex flex-col gap-3 w-[250px] sm:w-[350px] border-red-500 relative"
      ref={containerRef}
    >
      <label className="text-gray-300 text-sm md:text-base font-medium">
        {label}
      </label>
      <input
        className="text-slate-800 text-sm md:text-base px-3 bg-slate-200 py-1 sm:py-2 rounded-sm border-none outline-none focus:outline-red-300 outline-5 block"
        type="text"
        value={input}
        onChange={onChange}
        onFocus={onInputFocus}
      />
      {showSuggestions && (
        <ul className="bg-zinc-300 absolute w-full top-[70px] sm:top-[85px] overflow-auto lg:top-[90px] z-10 text-slate-800 rounded-sm">
          {suggestions?.map((suggestion) => (
            <li
              key={suggestion.name}
              className="p-2 md:p-4 text-sm md:text-base hover:bg-slate-600 rounded-sm hover:text-gray-300 transition ease-in-out duration-150"
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
