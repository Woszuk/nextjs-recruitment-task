"use client";

import Modal from "@/app/components/atoms/Modal";
import UserForm from "@/app/components/organisms/UserForm";
import UserCards from "@/app/components/organisms/UserCards";
import List from "@/app/components/templates/List";
import { createUser, getUsers } from "@/app/lib/actions/user-actions";
import { User } from "@/app/lib/db/types";
import { useEffect, useState } from "react";
import { UserFormData } from "@/app/lib/schemas/user-schema";

export default function Home() {
  const [open, setOpen] = useState<boolean>(false);
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | undefined>(undefined);

  const fetchUsers = async () => {
    const { error, users } = await getUsers();
    setError(error);
    setUsers(users ?? []);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const onSubmit = async (data: UserFormData) => {
    await createUser(data);
    handleClose();
  };

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
      <Modal open={open} handleClose={handleClose}>
        <UserForm onSubmit={onSubmit} title="Create User" />
      </Modal>
    </>
  );
}
