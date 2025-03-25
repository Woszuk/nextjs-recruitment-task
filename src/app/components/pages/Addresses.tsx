"use client";

import Modal from "@/app/components/atoms/Modal";
import AddressCards from "@/app/components/organisms/AddressCards";
import AddressForm from "@/app/components/organisms/AddressForm";
import List from "@/app/components/templates/List";
import { createAddress } from "@/app/lib/actions/address-actions";
import { AddressWithUserName } from "@/app/lib/db/types";
import { AddressFormData } from "@/app/lib/schemas/address-schema";
import { useState } from "react";

type AddressesPageProps = {
  addresses?: AddressWithUserName[];
  error?: string;
  userId: number;
};

export default function AddressesPage({
  addresses,
  error,
  userId,
}: AddressesPageProps) {
  const [open, setOpen] = useState<boolean>(false);

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = async (data: AddressFormData) => {
    await createAddress({
      ...data,
      user_id: userId,
      valid_from: new Date(data.valid_from),
    });
    handleClose();
  };
  return (
    <>
      <List
        title={`${addresses?.[0].name} Addresses` || "Addresses"}
        buttonLabel="Create Address"
        toggleOpen={() => setOpen((prev) => !prev)}
      >
        {error && <div>{error}</div>}
        {addresses && <AddressCards addresses={addresses} />}
      </List>
      <Modal open={open} handleClose={handleClose}>
        <AddressForm onSubmit={onSubmit} title="Create address" />
      </Modal>
    </>
  );
}
