type CardProps = {
  children: React.ReactNode;
};

export default function Card({ children }: CardProps) {
  return (
    <div className="flex flex-col border-1 p-3 rounded-lg cursor-pointer hover:bg-gray-50">
      {children}
    </div>
  );
}
