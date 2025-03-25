import { InputHTMLAttributes } from "react";

type InputContainerProps = {
  children: React.ReactNode;
  label: string;
  value: InputHTMLAttributes<HTMLInputElement>["value"];
  id?: string;
  error?: string;
};

export default function InputContainer({
  children,
  error,
  value,
  label,
  id,
}: InputContainerProps) {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col relative">
        {children}

        <label
          className={`font-medium absolute left-1 px-1 text-gray-600 bg-gray-50 peer-focus:text-sm peer-focus:top-0 ${
            value
              ? "top-0 text-sm -translate-y-1/2"
              : "top-1/2 -translate-y-1/2"
          }`}
          htmlFor={id}
        >
          {label}
        </label>
      </div>
      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  );
}
