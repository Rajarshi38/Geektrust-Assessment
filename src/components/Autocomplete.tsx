import React, { useCallback, useEffect, useRef, useState } from "react";
import { IAutocompleteProps } from "../interface/Autocomplete.interface";
import { IoChevronDownOutline } from "react-icons/io5";
import { useFalconForm } from "../hooks/useFalconForm";

const Autocomplete = ({ index, type, data }: IAutocompleteProps) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<Planet[] | Vehicle[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const { register, setValue, getValues } = useFalconForm();
  const [currentIndex, setCurrentIndex] = useState(-1);

  const suggestionsOpenRef = useRef<boolean>(showSuggestions);
  suggestionsOpenRef.current = showSuggestions;

  useEffect(() => {
    if (listRef.current) {
      const bottomDistance = listRef.current.getBoundingClientRect().bottom;
      if (bottomDistance > document.documentElement.clientHeight) {
        listRef.current.classList.add(
          "top-auto",
          "lg:top-auto",
          "sm:top-auto",
          "bottom-[40px]",
          "lg:bottom-[50px]"
        );
      }
    }
  }, [showSuggestions]);

  const filterSuggestion = useCallback(
    (value: string) => {
      if (value === "") {
        setSuggestions(data!);
        return;
      }

      const filteredSuggestions = data?.filter((planet) =>
        planet.name.toLowerCase().includes(value.toLowerCase())
      ) as Planet[];
      setSuggestions(filteredSuggestions);
    },
    [data]
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
    expandMenu(value);
  };

  const onInputFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    const { value } = event.target;
    expandMenu(value);
  };

  const suggestionOnClick = (event: React.MouseEvent<HTMLLIElement>) => {
    event.stopPropagation();
    setValue(
      type === "planet" ? `destination_${index}` : `vehicle_${index}`,
      event.currentTarget.innerText
    );
    setShowSuggestions(false);
  };

  const onKeydown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    event.stopPropagation();
    const { key } = event;
    if (key === "ArrowUp") {
      setCurrentIndex((currentIndex) => {
        if (currentIndex === -1) return currentIndex;
        return currentIndex - 1;
      });
    } else if (key === "ArrowDown") {
      setCurrentIndex((currentIndex) => {
        if (currentIndex == suggestions.length - 1) return currentIndex;
        else return currentIndex + 1;
      });
    } else if (key === "Enter") {
      if (
        currentIndex > -1 &&
        currentIndex < suggestions.length &&
        listRef.current
      ) {
        const currentElement = listRef.current.children[
          currentIndex
        ] as HTMLLIElement;
        setValue(
          type === "planet" ? `destination_${index}` : `vehicle_${index}`,
          currentElement.innerText
        );
        setShowSuggestions(false);
        (event.target as HTMLInputElement).blur();
      }
    }
  };

  return (
    data && (
      <div className="flex flex-col gap-3 w-full border-red-500 relative">
        <label className="text-gray-300 text-sm md:text-base font-semibold">
          {type === "planet"
            ? `Planet ${index}`
            : `Vehicle for Planet ${index}`}
        </label>
        <div className="relative" ref={containerRef}>
          <input
            className="input w-full text-sm md:text-base px-3 bg-slate-200 py-1 sm:py-2 rounded-sm border-none outline-none focus:ring-2 ring-red-300 outline-5 block input"
            type="text"
            {...register(
              type === "planet" ? `destination_${index}` : `vehicle_${index}`,
              {
                onChange: onChange,
              }
            )}
            onFocus={onInputFocus}
            onKeyDown={onKeydown}
            placeholder={
              type === "planet" ? `Enter planet no ${index}` : "Choose Vehicle"
            }
          />
          <span
            className="absolute top-[6px] right-2 md:top-[13px]"
            onClick={() => {
              if (suggestionsOpenRef.current) {
                closeMenu();
              } else {
                expandMenu(getValues(`destination_${index}`));
              }
            }}
          >
            <IoChevronDownOutline className="w-4 h-4 text-slate-400" />
          </span>
        </div>
        {showSuggestions && (
          <ul
            key={crypto.randomUUID()}
            ref={listRef}
            className="bg-zinc-300 absolute w-full top-[70px] sm:top-[85px] overflow-auto lg:top-[90px] z-10 text-slate-800 rounded-sm ring-1 ring-slate-700"
          >
            {suggestions?.map((suggestion, idx) => (
              <li
                id=""
                key={crypto.randomUUID()}
                className={`p-2 md:p-4 text-sm md:text-base hover:bg-slate-600 rounded-sm hover:text-gray-300 transition ease-in-out duration-150${
                  currentIndex === idx ? " bg-slate-600 text-gray-300" : ""
                }`}
                onClick={suggestionOnClick}
              >
                {suggestion.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    )
  );
};

export default Autocomplete;
