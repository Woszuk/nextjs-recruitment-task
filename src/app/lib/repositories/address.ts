import { db } from "@/app/lib/db";
import {
  AddressWithUserName,
  NewAddress,
  UpdateAddress,
} from "@/app/lib/db/types";
import { AddressType } from "@/app/lib/enums/address";
import { sql } from "kysely";

export const createAddressRepository = () => {
  const findUserWithAddresses = (
    userId: number
  ): Promise<AddressWithUserName[]> => {
    return db
      .selectFrom("users_addresses")
      .innerJoin("users", "users.id", "users_addresses.user_id")
      .selectAll("users_addresses")
      .select([
        sql<string>`COALESCE(users.first_name || ' ', '') || users.last_name`.as(
          "name"
        ),
      ])
      .where("user_id", "=", userId)
      .execute();
  };

  const create = (data: NewAddress) => {
    return db
      .insertInto("users_addresses")
      .values(data)
      .returningAll()
      .execute();
  };

  const remove = ({
    userId,
    addressType,
    validFrom,
  }: {
    userId: number;
    addressType: AddressType;
    validFrom: Date;
  }) => {
    return db
      .deleteFrom("users_addresses")
      .where("user_id", "=", userId)
      .where("address_type", "=", addressType)
      .where("valid_from", "=", validFrom)
      .executeTakeFirst();
  };

  const update = ({
    data,
    userId,
    addressType,
    validFrom,
  }: {
    data: UpdateAddress;
    userId: number;
    addressType: AddressType;
    validFrom: Date;
  }) => {
    return db
      .updateTable("users_addresses")
      .set(data)
      .where("user_id", "=", userId)
      .where("address_type", "=", addressType)
      .where("valid_from", "=", validFrom)
      .executeTakeFirst();
  };

  return { findUserWithAddresses, create, remove, update };
};
