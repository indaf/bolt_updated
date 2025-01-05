import React from "react";
import { ChevronDown } from "lucide-react";

interface MultiSelectProps {
  options: string[];
  selectedValues: string[];
  onChange: (values: string[]) => void;
  placeholder: string;
  disabled?: boolean;
}

export function MultiSelect({
  options,
  selectedValues,
  onChange,
  placeholder,
  disabled = false,
}: MultiSelectProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleOption = (value: string) => {
    if (disabled) return;
    const newValues = selectedValues.includes(value)
      ? selectedValues.filter((v) => v !== value)
      : [...selectedValues, value];
    onChange(newValues);
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={`
          w-full flex items-center justify-between gap-2 px-3 py-2 text-sm 
          bg-[#2A2B32] border rounded-lg focus:border-[#009B70] border-gray-700 text-white
          ${
            disabled
              ? "cursor-not-allowed bg-[#2A2B38] border-gray-500 text-gray-400"
              : "bg-[#2A2B32] border-gray-700 text-white"
          }
        `}
        disabled={disabled}
      >
        <span className="truncate">
          {selectedValues.length > 0
            ? `${selectedValues.length} sélectionné${
                selectedValues.length > 1 ? "s" : ""
              }`
            : placeholder}
        </span>
        <ChevronDown
          className={`w-4 h-4 ${disabled ? "text-gray-400" : "text-white"}`}
        />
      </button>

      {isOpen && !disabled && (
        <div className="absolute z-10 w-full mt-1 bg-[#2A2B38] border rounded-lg shadow-lg max-h-60 overflow-auto border-gray-700">
          {options.map((option) => (
            <label
              key={option}
              className="flex items-center px-3 py-2 bg-[#2A2B38] cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selectedValues.includes(option)}
                onChange={() => toggleOption(option)}
                className="mr-2"
              />
              <span className="text-sm">{option}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}
