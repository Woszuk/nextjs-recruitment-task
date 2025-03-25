import { db } from "@/app/lib/db";
import { NewUser, UpdateUser } from "@/app/lib/db/types";

export const createUserRepository = () => {
  const findAll = () => {
    return db.selectFrom("users").selectAll().execute();
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
