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
      ? "border-1 border-primary-light hover:border-primary-dark"
      : "bg-primary-light hover:bg-primary-dark text-white";

  return (
    <button
      className={`p-2 rounded-lg cursor-pointer ${buttonStyle} ${className}`}
      {...props}
    >
      {label}
    </button>
  );
}
