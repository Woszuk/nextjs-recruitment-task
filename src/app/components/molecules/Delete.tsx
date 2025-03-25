import Button from "@/app/components/atoms/Button";
import Modal from "@/app/components/atoms/Modal";
import { deleteUser } from "@/app/lib/actions/user-actions";
import { useState } from "react";

type DeleteProps = {
  name: string;
  id: number;
};

export default function Delete({ name, id }: DeleteProps) {
  const [open, setOpen] = useState<boolean>(false);

  const openModal = () => {
    setOpen((prev) => !prev);
  };

  const onClick = async () => {
    await deleteUser(id);
    handleClose();
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div onClick={openModal}>
        <p className="text-red-500 p-2 hover:text-red-600">Delete</p>
      </div>
      <Modal open={open} handleClose={handleClose}>
        <div className="flex flex-col items-center gap-4">
          <p className="text-center">
            Are you sure you want to delete{" "}
            <span className="font-bold">{name}</span>?
          </p>
          <div className="flex justify-center gap-10 w-full">
            <Button
              label="Yes"
              className="border-red-500 hover:border-red-700 border-1"
              onClick={onClick}
            />
            <Button label="No" onClick={handleClose} />
          </div>
        </div>
      </Modal>
    </>
  );
}
