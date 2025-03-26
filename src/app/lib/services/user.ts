import { logger } from "@/app/lib/config/logger";
import { NewUser, UpdateUser } from "@/app/lib/db/types";
import { createUserRepository } from "@/app/lib/repositories/user";
import { revalidatePath } from "next/cache";

export const createUserServices = () => {
  const repository = createUserRepository();

  const getAll = async ({
    pageSize,
    page,
  }: {
    pageSize: number;
    page: number;
  }) => {
    try {
      const { data, totalItems } = await repository.findAll({ page, pageSize });
      return { users: data, totalItems };
    } catch (error) {
      logger.error({ error }, "Failed to fetch users");
      return { error: "Failed to fetch users" };
    }
  };

  const create = async (data: NewUser) => {
    try {
      const user = await repository.create(data);
      revalidatePath("/", "page");
      return { user };
    } catch (error) {
      logger.error({ error }, "Failed to create user");
      return { error: "Failed to create user" };
    }
  };

  const remove = async (id: number) => {
    try {
      await repository.remove(id);
      revalidatePath("/", "page");
    } catch (error) {
      logger.error({ error }, "Failed to remove user");
      return { error: "Failed to remove user" };
    }
  };

  const update = async ({ user, id }: { user: UpdateUser; id: number }) => {
    try {
      await repository.update({ data: user, id });
      revalidatePath("/", "page");
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
