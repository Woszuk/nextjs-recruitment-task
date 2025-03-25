import UserName from "@/app/components/atoms/UserName";
import UserCard from "@/app/components/molecules/UserCard";
import { User } from "@/app/lib/db/types";
import { capitalize } from "@/app/utils/capitalize";
import { useRouter } from "next/navigation";

type UserCardProps = {
  users: User[];
};

export default function UserCards({ users }: UserCardProps) {
  const router = useRouter();

  const onClick = (id: number) => {
    router.push(`/${id}/addresses`);
  };
  return (
    <>
      {users.map((user) => {
        const userName = user.first_name
          ? `${user.first_name} ${user.last_name}`
          : user.last_name;
        return (
          <UserCard key={user.id} user={user} name={userName} onClick={onClick}>
            <UserName
              lastName={user.last_name}
              firstName={user.first_name}
              initials={user.initials}
            />
            <div>Email: {user.email}</div>
            <div>Status: {capitalize(user.status)}</div>
          </UserCard>
        );
      })}
    </>
  );
}
