import { logger } from "@/app/lib/config/logger";
import { NewUser, UpdateUser } from "@/app/lib/db/types";
import { createUserRepository } from "@/app/lib/repositories/user";

export const createUserServices = () => {
  const repository = createUserRepository();

  const getAll = async () => {
    try {
      const users = await repository.findAll();
      return { users };
    } catch (error) {
      logger.error({ error }, "Failed to fetch users");
      return { error: "Failed to fetch users" };
    }
  };

  const create = async (data: NewUser) => {
    try {
      const user = await repository.create(data);
      return { user };
    } catch (error) {
      logger.error({ error }, "Failed to create user");
      return { error: "Failed to create user" };
    }
  };

  const remove = async (id: number) => {
    try {
      await repository.remove(id);
    } catch (error) {
      logger.error({ error }, "Failed to remove user");
      return { error: "Failed to remove user" };
    }
  };

  const update = async ({ user, id }: { user: UpdateUser; id: number }) => {
    try {
      await repository.update({ data: user, id });
    } catch (error) {
      logger.error({ error }, "Failed to update user");
      return { error: "Failed to update user" };
    }
  };

  return {
    getAll,
    create,
    remove,
    update,
  };
};

export const userServices = createUserServices();
