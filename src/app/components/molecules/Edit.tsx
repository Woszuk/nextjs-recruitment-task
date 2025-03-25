import Modal from "@/app/components/atoms/Modal";
import UserForm from "@/app/components/organisms/UserForm";
import { updateUser } from "@/app/lib/actions/user-actions";
import { User } from "@/app/lib/db/types";
import { FormData } from "@/app/lib/schemas/user-schema";
import { useState } from "react";

type EditProps = {
  user: User;
};

export default function Edit({ user }: EditProps) {
  const [open, setOpen] = useState<boolean>(false);

  const openModal = () => {
    setOpen((prev) => !prev);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = async (data: FormData) => {
    await updateUser({ user: data, id: user.id });
    handleClose();
  };

  return (
    <>
      <div onClick={openModal}>
        <p className="p-2 hover:text-primary-light">Edit</p>
      </div>
      <Modal open={open} handleClose={handleClose}>
        <UserForm
          user={user}
          onSubmit={onSubmit}
          title="Update user"
          buttonLabel="Update"
        />
      </Modal>
    </>
  );
}
