import { db } from "@/app/lib/db";

export const createUserRepository = () => {
  const findAll = () => {
    return db.selectFrom("users").selectAll().execute();
  };

  return { findAll };
};
