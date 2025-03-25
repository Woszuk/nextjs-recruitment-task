import UserName from "@/app/components/atoms/UserName";
import Card from "@/app/components/molecules/Card";
import { User } from "@/app/lib/db/types";
import { capitalize } from "@/app/utils/capitalize";

type UserCardProps = {
  users: User[];
};

export default function UserCards({ users }: UserCardProps) {
  return (
    <>
      {users.map((user) => {
        const userName = user.first_name
          ? `${user.first_name} ${user.last_name}`
          : user.last_name;
        return (
          <Card key={user.id} id={user.id} name={userName}>
            <UserName
              lastName={user.last_name}
              firstName={user.first_name}
              initials={user.initials}
            />
            <div>Email: {user.email}</div>
            <div>Status: {capitalize(user.status)}</div>
          </Card>
        );
      })}
    </>
  );
}
