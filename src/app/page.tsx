import { getUsers } from "@/app/lib/actions/user-actions";

export default async function Home() {
  const { users } = await getUsers();

  return (
    <div className="flex flex-col">
      {users && users.map((user) => <div key={user.email}>{user.email}</div>)}
    </div>
  );
}
