import type { MovieLanguage } from "../types/movie";

interface LanguageOption {
  value: MovieLanguage;
  label: string;
}

interface LanguageSelectorProps {
  value: MovieLanguage;
  onChange: (value: MovieLanguage) => void;
  options: LanguageOption[];
  className?: string;
  disabled?: boolean;
}

export const LanguageSelector = ({
  value,
  onChange,
  options,
  className = "",
  disabled = false,
}: LanguageSelectorProps) => {
  return (
    <select
      aria-label="언어 선택"
      disabled={disabled}
      value={value}
      onChange={(e) => onChange(e.target.value as MovieLanguage)}
      className={`
        w-full rounded-lg 
        border border-black 
        bg-black text-pink-500
        px-4 py-2 shadow-md
        transition-all duration-200 ease-in-out
        focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500
        hover:border-pink-400
        disabled:cursor-not-allowed disabled:opacity-50
        ${className}
      `}
    >
      {options.map((option) => (
        <option
          key={option.value}
          value={option.value}
          className="bg-black text-white"
        >
          {option.label}
        </option>
      ))}
    </select>
  );
};
