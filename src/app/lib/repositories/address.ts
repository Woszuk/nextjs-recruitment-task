import { db } from "@/app/lib/db";
import {
  AddressWithUserName,
  NewAddress,
  UpdateAddress,
} from "@/app/lib/db/types";
import { AddressType } from "@/app/lib/enums/address";
import { sql } from "kysely";

export const createAddressRepository = () => {
  const findUserWithAddresses = async ({
    pageSize,
    page,
    userId,
  }: {
    pageSize: number;
    page: number;
    userId: number;
  }): Promise<{ addresses: AddressWithUserName[]; totalItems: number }> => {
    const offset = (page - 1) * pageSize;

    const data = await db
      .selectFrom("users_addresses")
      .innerJoin("users", "users.id", "users_addresses.user_id")
      .selectAll("users_addresses")
      .select([
        sql<string>`COALESCE(users.first_name || ' ', '') || users.last_name`.as(
          "name"
        ),
      ])
      .where("user_id", "=", userId)
      .limit(pageSize)
      .offset(offset)
      .orderBy("users_addresses.created_at desc")
      .execute();

    const totalItems = await db
      .selectFrom("users_addresses")
      .select(({ fn }) => fn.count<number>("user_id").as("total"))
      .where("user_id", "=", userId)
      .executeTakeFirst();

    return { addresses: data, totalItems: totalItems?.total || 0 };
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
