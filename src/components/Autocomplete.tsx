import { useCallback, useEffect, useRef, useState } from "react";
import { IAutocompleteProps } from "../interface/Autocomplete.interface";
import { IoChevronDownOutline } from "react-icons/io5";

const Autocomplete = ({
  label,
  name,
  placeholder,
  planets,
}: IAutocompleteProps) => {
  const [input, setInput] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<Planet[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const suggestionsOpenRef = useRef<boolean>(showSuggestions);
  suggestionsOpenRef.current = showSuggestions;

  useEffect(() => {
    if (listRef.current) {
      const bottomDistance = listRef.current.getBoundingClientRect().bottom;
      if (bottomDistance > document.documentElement.clientHeight) {
        listRef.current.classList.add("top-auto", "bottom-[40px]");
      }
    }
  }, [showSuggestions]);

  const filterSuggestion = useCallback(
    (value: string) => {
      if (value === "") {
        setSuggestions(planets!);
        return;
      }

      const filteredSuggestions = planets?.filter((planet) =>
        planet.name.toLowerCase().includes(value.toLowerCase())
      ) as Planet[];
      setSuggestions(filteredSuggestions);
    },
    [planets]
  );

  const expandMenu = useCallback(
    (value: string) => {
      setShowSuggestions(true);
      filterSuggestion(value);
    },
    [filterSuggestion]
  );

  const closeMenu = useCallback(() => {
    setShowSuggestions(false);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        closeMenu();
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [closeMenu]);

  useEffect(() => {
    const handleEscapeOrTab = (e: KeyboardEvent) => {
      if (
        suggestionsOpenRef.current &&
        (e.key === "Escape" || e.key === "Tab")
      ) {
        closeMenu();
      }
    };
    document.addEventListener("keydown", handleEscapeOrTab);

    return () => {
      document.removeEventListener("keydown", handleEscapeOrTab);
    };
  }, [closeMenu]);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setInput(value);
    expandMenu(value);
  };

  const onInputFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    const { value } = event.target;
    expandMenu(value);
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
      <label className="text-gray-300 text-sm md:text-base font-semibold">
        {label}
      </label>
      <div className="relative">
        <input
          className="text-slate-800 font-medium w-full text-sm md:text-base px-3 bg-slate-200 py-1 sm:py-2 rounded-sm border-none outline-none focus:outline-red-300 outline-5 block input"
          type="text"
          name={name}
          value={input}
          onChange={onChange}
          onFocus={onInputFocus}
          placeholder={placeholder}
        />
        <span
          className="absolute top-[6px] right-2 md:top-[13px]"
          onClick={() => expandMenu(input)}
        >
          <IoChevronDownOutline className="w-4 h-4 text-slate-400" />
        </span>
      </div>
      {showSuggestions && (
        <ul
          ref={listRef}
          className="bg-zinc-300 absolute w-full top-[70px] sm:top-[85px] overflow-auto lg:top-[90px] z-10 text-slate-800 rounded-sm"
        >
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
