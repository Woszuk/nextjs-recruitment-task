type UserNameProps = {
  firstName?: string;
  lastName: string;
  initials?: string;
};

export default function UserName({
  lastName,
  firstName,
  initials,
}: UserNameProps) {
  return (
    <div className="flex gap-1 font-bold">
      {firstName && <p>{firstName}</p>}
      <p>{lastName}</p>
      {initials && <p>({initials})</p>}
    </div>
  );
}
