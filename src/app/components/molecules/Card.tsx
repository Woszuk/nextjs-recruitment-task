import Delete from "@/app/components/molecules/Delete";
import { DotsIcon } from "@/app/components/atoms/icons/DotsIcon";
import Popover from "@/app/components/atoms/Popover";
import { useState } from "react";
import Edit from "@/app/components/molecules/Edit";
import { User } from "@/app/lib/db/types";

type CardProps = {
  children: React.ReactNode;
  name: string;
  user: User;
};

export default function Card({ children, user, name }: CardProps) {
  const [open, setOpen] = useState<boolean>(false);

  const togglePopover = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setOpen((prev) => !prev);
  };

  return (
    <div className="relative flex flex-col border-2 border-primary-light p-3 rounded-lg cursor-pointer hover:border-primary-dark">
      <div
        className="absolute right-0 top-0 cursor-pointer"
        onClick={togglePopover}
      >
        <div className="hover:text-primary-dark p-2">
          <DotsIcon className="text-xl" />
        </div>
      </div>
      <Popover open={open} handleClose={() => setOpen(false)}>
        <Edit user={user} />
        <Delete name={name} id={user.id} />
      </Popover>

      {children}
    </div>
  );
}
