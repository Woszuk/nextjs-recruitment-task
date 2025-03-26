import { db } from "@/app/lib/db";
import { NewUser, UpdateUser } from "@/app/lib/db/types";

export const createUserRepository = () => {
  const findAll = async ({
    pageSize,
    page,
  }: {
    pageSize: number;
    page: number;
  }) => {
    const offset = (page - 1) * pageSize;
    const data = await db
      .selectFrom("users")
      .selectAll()
      .limit(pageSize)
      .offset(offset)
      .execute();

    const totalItems = await db
      .selectFrom("users")
      .select(({ fn }) => fn.count<number>("id").as("total"))
      .executeTakeFirst();

    return { data, totalItems: totalItems?.total || 0 };
  };

  const create = (data: NewUser) => {
    return db.insertInto("users").values(data).returningAll().execute();
  };

  const remove = (id: number) => {
    return db.deleteFrom("users").where("id", "=", id).executeTakeFirst();
  };

  const update = ({ data, id }: { data: UpdateUser; id: number }) => {
    return db
      .updateTable("users")
      .set(data)
      .where("id", "=", id)
      .executeTakeFirst();
  };

  return { findAll, create, remove, update };
};
