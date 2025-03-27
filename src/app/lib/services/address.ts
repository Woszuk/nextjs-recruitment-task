import { NewAddress, UpdateAddress } from "@/app/lib/db/types";
import { AddressType } from "@/app/lib/enums/address";
import { createAddressRepository } from "@/app/lib/repositories/address";
import { logError } from "@/app/utils/logError";
import { revalidatePath } from "next/cache";

export const createAddressServices = () => {
  const repository = createAddressRepository();

  const getUserWithAddresses = async ({
    pageSize,
    page,
    userId,
  }: {
    pageSize: number;
    page: number;
    userId: number;
  }) => {
    try {
      const { addresses, totalItems } = await repository.findUserWithAddresses({
        pageSize,
        page,
        userId,
      });
      return { addresses, totalItems };
    } catch (error) {
      logError({ error, message: "Failed to fetch addresses" });
      return { error: "Failed to fetch addresses" };
    }
  };

  const create = async (data: NewAddress) => {
    try {
      await repository.create(data);
      revalidatePath("/[userId]/addresses", "page");
      return { success: "Address created successfully" };
    } catch (error) {
      logError({ error, message: "Failed to create address" });
      return { error: "Failed to create address" };
    }
  };
  const remove = async ({
    userId,
    addressType,
    validFrom,
  }: {
    userId: number;
    addressType: AddressType;
    validFrom: Date;
  }) => {
    const message = "Failed to remove address";
    try {
      const { numDeletedRows } = await repository.remove({
        userId,
        addressType,
        validFrom,
      });
      if (!numDeletedRows) {
        throw new Error(message);
      }
      revalidatePath("/[userId]/addresses", "page");
      return { success: "Address removed successfully" };
    } catch (error) {
      logError({ error, message });
      return { error: message };
    }
  };

  const update = async ({
    address,
    userId,
    addressType,
    validFrom,
  }: {
    address: UpdateAddress;
    userId: number;
    addressType: AddressType;
    validFrom: Date;
  }) => {
    const message = "Failed to update address";
    try {
      const { numUpdatedRows } = await repository.update({
        data: address,
        userId,
        addressType,
        validFrom,
      });
      if (!numUpdatedRows) {
        throw new Error(message);
      }
      revalidatePath("/[userId]/addresses", "page");
      return { success: "Address updated successfully" };
    } catch (error) {
      logError({ error, message });
      return { error: message };
    }
  };

  return {
    getUserWithAddresses,
    create,
    remove,
    update,
  };
};

export const addressServices = createAddressServices();
