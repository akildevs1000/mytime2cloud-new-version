import React from "react";

const RadioGroup = ({
  options = [],
  selectedValue,
  onChange,
  label,
  name = "radio-group",
  layout = "horizontal", // or "horizontal"
}) => {
  return (
    <div className="flex flex-col gap-3">
      {label && (
        <label className="text-sm font-semibold text-slate-500 dark:text-slate-400 ml-1">
          {label}
        </label>
      )}

      <div
        className={`flex ${layout === "horizontal" ? "flex-row gap-3" : "flex-col gap-2"}`}
      >
        {options.map((option) => {
          const isSelected = selectedValue === option.value;

          return (
            <label
              key={option.value}
              className={` px-2
                relative flex items-center group cursor-pointer h-10 rounded-xl border transition-all duration-200
                ${
                  isSelected
                    ? "bg-primary/5 border-primary/40 ring-1 ring-primary/20"
                    : "bg-white dark:bg-slate-900 border-gray-200 dark:border-white/10 hover:border-primary/30"
                }
              `}
            >
              {/* Hidden Native Radio */}
              <input
                type="radio"
                name={name}
                value={option.value}
                checked={isSelected}
                onChange={() => onChange(option.value)}
                className="sr-only"
              />

              {/* Custom Radio Circle */}
              <div
                className={`
                flex items-center justify-center w-5 h-5 rounded-full border-2 transition-all duration-200
                ${
                  isSelected
                    ? "border-primary bg-primary"
                    : "border-slate-300 dark:border-slate-600 group-hover:border-primary/50"
                }
              `}
              >
                <div
                  className={`
                  w-2 h-2 rounded-full bg-white transition-transform duration-200
                  ${isSelected ? "scale-100" : "scale-0"}
                `}
                />
              </div>

              {/* Label Text */}
              <div className="ml-3 flex flex-col">
                <span
                  className={`text-sm font-medium transition-colors ${
                    isSelected
                      ? "text-primary"
                      : "text-slate-700 dark:text-slate-300"
                  }`}
                >
                  {option.label}
                </span>
                {option.description && (
                  <span className="text-xs text-slate-400">
                    {option.description}
                  </span>
                )}
              </div>
            </label>
          );
        })}
      </div>
    </div>
  );
};

export default RadioGroup;
