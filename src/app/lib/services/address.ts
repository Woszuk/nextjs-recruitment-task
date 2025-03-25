import { logger } from "@/app/lib/config/logger";
import { NewAddress, UpdateAddress } from "@/app/lib/db/types";
import { AddressType } from "@/app/lib/enums/address";
import { createAddressRepository } from "@/app/lib/repositories/address";

export const createAddressServices = () => {
  const repository = createAddressRepository();

  const getUserWithAddresses = async (userId: number) => {
    try {
      const addresses = await repository.findUserWithAddresses(userId);
      return { addresses };
    } catch (error) {
      logger.error({ error }, "Failed to fetch addresses");
      return { error: "Failed to fetch addresses" };
    }
  };

  const create = async (data: NewAddress) => {
    try {
      const address = await repository.create(data);
      return { address };
    } catch (error) {
      logger.error({ error }, "Failed to create address");
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
    try {
      await repository.remove({ userId, addressType, validFrom });
    } catch (error) {
      logger.error({ error }, "Failed to remove address");
      return { error: "Failed to remove address" };
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
    try {
      await repository.update({
        data: address,
        userId,
        addressType,
        validFrom,
      });
    } catch (error) {
      logger.error({ error }, "Failed to update address");
      return { error: "Failed to update address" };
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
