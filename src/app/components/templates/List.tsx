type ListProps = {
  children: React.ReactNode;
  title: string;
};

export default async function List({ children, title }: ListProps) {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-center text-2xl font-bold uppercase">{title}</p>
      <div className="grid grid-cols-auto grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-2 font-medium">
        {children}
      </div>
    </div>
  );
}
