import { useId } from "react";

interface SelectBoxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  id?: string;
  className?: string;
  disabled?: boolean;
}

export const SelectBox = ({
  checked,
  onChange,
  label,
  id,
  className = "",
  disabled = false,
}: SelectBoxProps) => {
  const generatedId = useId();
  const checkboxId = id ?? generatedId;

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <input
        type="checkbox"
        id={checkboxId}
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange(e.target.checked)}
        className="
          size-4 cursor-pointer rounded
          border-gray-300 bg-gray-100
          text-blue-600
          focus:ring-2 focus:ring-blue-400
          disabled:cursor-not-allowed disabled:opacity-50
        "
      />

      <label
        htmlFor={checkboxId}
        className={`
          select-none text-sm text-gray-700
          ${disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"}
        `}
      >
        {label}
      </label>
    </div>
  );
};
