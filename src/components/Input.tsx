interface InputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export const Input = ({
  value,
  onChange,
  placeholder = "검색어를 입력하세요",
  className = "",
  disabled = false,
}: InputProps) => {
  return (
    <input
      type="text"
      aria-label={placeholder}
      disabled={disabled}
      className={`
        w-full rounded-lg 
        border border-black 
        bg-black text-pink-500
        p-3 shadow-md
        placeholder:text-gray-400
        transition-all duration-200 ease-in-out
        focus:border-pink-500 focus:ring-2 focus:ring-pink-500
        hover:border-pink-400
        disabled:cursor-not-allowed disabled:opacity-50
        ${className}
      `}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};
