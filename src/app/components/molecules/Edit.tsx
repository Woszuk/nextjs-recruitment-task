import Modal from "@/app/components/atoms/Modal";
import { useState } from "react";

type EditProps = {
  children: (props: { handleClose: () => void }) => React.ReactNode;
};

export default function Edit({ children }: EditProps) {
  const [open, setOpen] = useState<boolean>(false);

  const openModal = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setOpen((prev) => !prev);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div onClick={openModal}>
        <p className="p-2 hover:text-primary-light">Edit</p>
      </div>
      <Modal open={open} handleClose={handleClose}>
        {children({ handleClose })}
      </Modal>
    </>
  );
}
