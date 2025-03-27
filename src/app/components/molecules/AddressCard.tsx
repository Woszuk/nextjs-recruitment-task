import Delete from "@/app/components/molecules/Delete";
import { DotsIcon } from "@/app/components/atoms/icons/DotsIcon";
import Popover from "@/app/components/atoms/Popover";
import { useState } from "react";
import Edit from "@/app/components/molecules/Edit";
import { Address } from "@/app/lib/db/types";
import AddressForm from "@/app/components/organisms/AddressForm";
import { AddressFormData } from "@/app/lib/schemas/address-schema";
import {
  deleteAddress,
  updateAddress,
} from "@/app/lib/actions/address-actions";
import { toast } from "react-toastify";

type AddressCardProps = {
  children: React.ReactNode;
  address: Address;
};

export default function AddressCard({ children, address }: AddressCardProps) {
  const [openPopover, setOpenPopover] = useState<boolean>(false);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);

  const togglePopover = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setOpenPopover((prev) => !prev);
  };

  const onDelete = async () => {
    const { error, success } = await deleteAddress({
      addressType: address.address_type,
      userId: address.user_id,
      validFrom: address.valid_from,
    });
    if (error) {
      toast.error(error);
    }
    if (success) {
      toast.success(success);
    }
    setOpenDeleteModal(false);
    setOpenPopover(false);
  };

  const onSubmit = async (data: AddressFormData) => {
    const { error, success } = await updateAddress({
      address: { ...data, valid_from: new Date(data.valid_from) },
      addressType: address.address_type,
      userId: address.user_id,
      validFrom: address.valid_from,
    });

    if (error) {
      toast.error(error);
    }
    if (success) {
      toast.success(success);
    }
  };

  return (
    <div className="relative flex flex-col border-2 border-primary-light p-3 rounded-lg cursor-pointer hover:border-primary-dark">
      <div>{children}</div>
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
              <AddressForm
                address={address}
                onSubmit={(data: AddressFormData) => {
                  onSubmit(data);
                  setOpenPopover(false);
                  handleClose();
                }}
                title="Update address"
                buttonLabel="Update"
              />
            )}
          </Edit>
          <Delete
            onClick={onDelete}
            open={openDeleteModal}
            setOpen={setOpenDeleteModal}
            name={`${address.city} - ${address.street} ${address.building_number}`}
          />
        </Popover>
      </div>
    </div>
  );
}
