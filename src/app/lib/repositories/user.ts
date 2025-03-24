import { db } from "@/app/lib/db";
import { NewUser } from "@/app/lib/db/types";

export const createUserRepository = () => {
  const findAll = () => {
    return db.selectFrom("users").selectAll().execute();
  };

  const create = (data: NewUser) => {
    return db.insertInto("users").values(data).returningAll().execute();
  };

  return { findAll, create };
};
