type CardProps = {
  children: React.ReactNode;
};

export default function Card({ children }: CardProps) {
  return (
    <div className="flex flex-col border-2 border-primary-light p-3 rounded-lg cursor-pointer hover:border-primary-dark">
      {children}
    </div>
  );
}
