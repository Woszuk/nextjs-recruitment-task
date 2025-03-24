import InputContainer from "@/app/components/atoms/InputContainer";

type InputProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  options: { label: string; value: string }[];
  error?: string;
};

export default function Select({
  label,
  options,
  error,
  ...props
}: InputProps) {
  return (
    <InputContainer error={error} label={label} value={props.value}>
      <select
        {...props}
        className="peer border-1 border-primary-light outline-none p-3 rounded-sm"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </InputContainer>
  );
}
