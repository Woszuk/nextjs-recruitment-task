"use client";

import Modal from "@/app/components/atoms/Modal";
import UserForm from "@/app/components/organisms/UserForm";
import UserCards from "@/app/components/organisms/UserCards";
import List from "@/app/components/templates/List";
import { createUser } from "@/app/lib/actions/user-actions";
import { User } from "@/app/lib/db/types";
import { useState } from "react";
import { UserFormData } from "@/app/lib/schemas/user-schema";
import { toast } from "react-toastify";

type UsersPageProps = {
  users?: User[];
  error?: string;
  totalItems?: number;
  page: number;
};

export default function UsersPage({
  users,
  error,
  totalItems,
  page,
}: UsersPageProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(page);

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = async (data: UserFormData) => {
    const { error, success } = await createUser(data);
    if (error) {
      toast.error(error);
    } else {
      toast.success(success);
      handleClose();
    }
  };

  return (
    <>
      <List
        title="users"
        buttonLabel="Create User"
        toggleOpen={() => setOpen((prev) => !prev)}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        totalItems={totalItems || 0}
        error={error}
        userList={true}
      >
        {users && <UserCards users={users} />}
      </List>
      <Modal open={open} handleClose={handleClose}>
        <UserForm onSubmit={onSubmit} title="Create User" />
      </Modal>
    </>
  );
}
