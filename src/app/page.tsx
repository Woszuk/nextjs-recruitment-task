"use client";

import Modal from "@/app/components/atoms/Modal";
import CreateUserForm from "@/app/components/organisms/CreateUserForm";
import UserCards from "@/app/components/organisms/UserCards";
import List from "@/app/components/templates/List";
import { getUsers } from "@/app/lib/actions/user-actions";
import { User } from "@/app/lib/db/types";
import { useEffect, useState } from "react";

export default function Home() {
  const [open, setOpen] = useState<boolean>(false);
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | undefined>(undefined);

  const fetchUsers = async () => {
    const { error, users } = await getUsers();
    setError(error);
    setUsers(users ?? []);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <List
        title="users"
        buttonLabel="Create User"
        toggleOpen={() => setOpen((prev) => !prev)}
      >
        {error && <div>{error}</div>}
        {users && <UserCards users={users} />}
      </List>
      <Modal open={open} handleClose={() => setOpen(false)}>
        <CreateUserForm />
      </Modal>
    </>
  );
}
