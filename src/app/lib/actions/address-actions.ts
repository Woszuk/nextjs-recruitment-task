"use server";

import { NewAddress, UpdateAddress } from "@/app/lib/db/types";
import { AddressType } from "@/app/lib/enums/address";
import { addressServices } from "@/app/lib/services/address";

export async function getAddresses({
  pageSize,
  page,
  userId,
}: {
  pageSize: number;
  page: number;
  userId: number;
}) {
  return addressServices.getAll({
    pageSize,
    page,
    conditions: { user_id: userId },
  });
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
  return addressServices.remove({
    conditions: {
      user_id: userId,
      address_type: addressType,
      valid_from: validFrom,
    },
  });
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
  return addressServices.update({
    conditions: {
      user_id: userId,
      address_type: addressType,
      valid_from: validFrom,
    },
    data: address,
  });
}
