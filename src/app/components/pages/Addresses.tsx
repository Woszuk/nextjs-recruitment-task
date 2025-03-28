"use client";

import Modal from "@/app/components/atoms/Modal";
import AddressCards from "@/app/components/organisms/AddressCards";
import AddressForm from "@/app/components/organisms/AddressForm";
import List from "@/app/components/templates/List";
import { createAddress } from "@/app/lib/actions/address-actions";
import { Address, User } from "@/app/lib/db/types";
import { AddressFormData } from "@/app/lib/schemas/address-schema";
import { useState } from "react";
import { toast } from "react-toastify";

type AddressesPageProps = {
  addresses?: Address[];
  user?: User | null;
  error?: string;
  totalItems?: number;
  userId: number;
  page: number;
};

export default function AddressesPage({
  addresses,
  user,
  error,
  userId,
  totalItems,
  page,
}: AddressesPageProps) {
  const userName = user?.first_name
    ? `${user.first_name} ${user.last_name}`
    : user?.last_name ?? "";

  const [open, setOpen] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(page);

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = async (data: AddressFormData) => {
    const { error, success } = await createAddress({
      ...data,
      user_id: userId,
      valid_from: new Date(data.valid_from),
    });
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
        title={`${userName} Addresses`}
        buttonLabel="Create Address"
        toggleOpen={() => setOpen((prev) => !prev)}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        totalItems={totalItems || 0}
        error={error}
      >
        {addresses && <AddressCards addresses={addresses} />}
      </List>
      <Modal open={open} handleClose={handleClose}>
        <AddressForm onSubmit={onSubmit} title="Create address" />
      </Modal>
    </>
  );
}
