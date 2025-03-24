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
      <div className="relative flex items-center justify-center">
        <p className="text-2xl font-bold uppercase">{title}</p>
        <Button
          className="absolute right-10"
          label={buttonLabel}
          onClick={toggleOpen}
        />
      </div>
      <div className="grid grid-cols-auto grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-2 font-medium">
        {children}
      </div>
    </div>
  );
}
