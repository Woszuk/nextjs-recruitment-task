type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string;
  variant?: "outlined" | "contained";
};

export default function Button({
  label,
  className,
  variant = "outlined",
  ...props
}: ButtonProps) {
  const buttonStyle =
    variant === "outlined"
      ? "border-1 border-primary-light hover:border-primary-dark disabled:hover:border-primary-light"
      : "bg-primary-light hover:bg-primary-dark text-white";

  return (
    <button
      className={`p-1 sm:p-2 min-w-[60px] rounded-lg cursor-pointer ${buttonStyle} ${className} disabled:bg-gray-300`}
      {...props}
    >
      {label}
    </button>
  );
}
