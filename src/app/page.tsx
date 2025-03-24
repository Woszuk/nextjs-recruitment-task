import UserCards from "@/app/components/organisms/UserCards";
import List from "@/app/components/templates/List";
import { getUsers } from "@/app/lib/actions/user-actions";

export default async function Home() {
  const { error, users } = await getUsers();

  return (
    <List title="users">
      {error && <div>{error}</div>}
      {users && <UserCards users={users} />}
    </List>
  );
}
