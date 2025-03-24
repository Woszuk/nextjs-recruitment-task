import InputContainer from "@/app/components/atoms/InputContainer";

type TextFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

export default function TextField({
  label,
  type = "text",
  error,
  ...props
}: TextFieldProps) {
  return (
    <InputContainer error={error} label={label} value={props.value}>
      <input
        type={type}
        {...props}
        className="peer border-1 border-primary-light outline-none p-3  rounded-sm"
      />
    </InputContainer>
  );
}
