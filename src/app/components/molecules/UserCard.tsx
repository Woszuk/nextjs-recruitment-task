import Delete from "@/app/components/molecules/Delete";
import { DotsIcon } from "@/app/components/atoms/icons/DotsIcon";
import Popover from "@/app/components/atoms/Popover";
import { useState } from "react";
import Edit from "@/app/components/molecules/Edit";
import { User } from "@/app/lib/db/types";
import { deleteUser, updateUser } from "@/app/lib/actions/user-actions";
import { UserFormData } from "@/app/lib/schemas/user-schema";
import UserForm from "@/app/components/organisms/UserForm";

type UserCardProps = {
  children: React.ReactNode;
  name: string;
  user: User;
  onClick: (id: number) => void;
};

export default function UserCard({
  children,
  user,
  name,
  onClick,
}: UserCardProps) {
  const [openPopover, setOpenPopover] = useState<boolean>(false);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);

  const togglePopover = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setOpenPopover((prev) => !prev);
  };

  const onDelete = async () => {
    await deleteUser(user.id);
    setOpenDeleteModal(false);
  };

  const onSubmit = async (data: UserFormData) => {
    await updateUser({ user: data, id: user.id });
  };

  return (
    <div className="relative flex flex-col border-2 border-primary-light p-3 rounded-lg cursor-pointer hover:border-primary-dark">
      <div onClick={() => onClick(user.id)}>{children}</div>
      <div>
        <div
          className="absolute right-0 top-0 cursor-pointer"
          onClick={togglePopover}
        >
          <div className="hover:text-primary-dark p-2">
            <DotsIcon className="text-xl" />
          </div>
        </div>
        <Popover open={openPopover} handleClose={() => setOpenPopover(false)}>
          <Edit>
            {({ handleClose }) => (
              <UserForm
                user={user}
                onSubmit={(data: UserFormData) => {
                  onSubmit(data);
                  handleClose();
                }}
                title="Update user"
                buttonLabel="Update"
              />
            )}
          </Edit>
          <Delete
            onClick={onDelete}
            open={openDeleteModal}
            setOpen={setOpenDeleteModal}
            name={name}
          />
        </Popover>
      </div>
    </div>
  );
}
