import Button from "@/app/components/atoms/Button";

type ListProps = {
  children: React.ReactNode;
  title: string;
  buttonLabel: string;
  toggleOpen: (e: React.MouseEvent<HTMLElement>) => void;
};

export default function List({
  children,
  title,
  buttonLabel,
  toggleOpen,
}: ListProps) {
  return (
    <div className="flex flex-col gap-5">
      <div className="relative flex items-center sm:justify-center justify-between ">
        <p className="text-2xl font-bold uppercase">{title}</p>
        <Button
          className="sm:absolute sm:right-10"
          label={buttonLabel}
          onClick={toggleOpen}
        />
      </div>
      <div className="grid lg:grid-cols-2 gap-2 font-medium">{children}</div>
    </div>
  );
}
