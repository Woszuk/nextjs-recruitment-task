"use server";

import { NewAddress, UpdateAddress } from "@/app/lib/db/types";
import { AddressType } from "@/app/lib/enums/address";
import { addressServices } from "@/app/lib/services/address";

export async function getUserWithAddresses(userId: number) {
  return addressServices.getUserWithAddresses(userId);
}

export async function createAddress(address: NewAddress) {
  return addressServices.create(address);
}

export async function deleteAddress({
  userId,
  addressType,
  validFrom,
}: {
  userId: number;
  addressType: AddressType;
  validFrom: Date;
}) {
  return addressServices.remove({ userId, addressType, validFrom });
}

export async function updateAddress({
  address,
  userId,
  addressType,
  validFrom,
}: {
  address: UpdateAddress;
  userId: number;
  addressType: AddressType;
  validFrom: Date;
}) {
  return addressServices.update({ address, userId, addressType, validFrom });
}
