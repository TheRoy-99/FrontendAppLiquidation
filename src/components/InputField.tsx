import type React from "react";

interface InputFieldProps {
  label: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  className?: string;
  icon?: React.ReactNode;
}

export default function InputField({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  required = false,
  className = "",
  icon,
}: InputFieldProps) {
  //Definir el valor de autoComplete según el tipo
  const getAutoComplete = () => {
    if (type === "password") return "current-password";
    if (type === "email") return "email";
    if (type === "tel") return "tel";
    if (type === "name" || label.toLowerCase().includes("nombre")) return "name";
    return "on";
  };

  return (
    <div className="flex flex-col space-y-1">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <div className="relative">
        {icon && (
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            {icon}
          </span>
        )}

        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          autoComplete={getAutoComplete()}
          className={`w-full border border-gray-300 rounded-md py-2 pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-primary text-sm text-gray-700 ${className}`}
        />
      </div>
    </div>
  );
}
