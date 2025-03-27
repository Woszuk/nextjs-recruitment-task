import { NewUser, UpdateUser } from "@/app/lib/db/types";
import { createUserRepository } from "@/app/lib/repositories/user";
import { logError } from "@/app/utils/logError";
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
      logError({ error, message: "Failed to fetch users" });
      return { error: "Failed to fetch users" };
    }
  };

  const create = async (data: NewUser) => {
    try {
      await repository.create(data);
      revalidatePath("/", "page");
      return { success: "User created successfully" };
    } catch (error) {
      logError({ error, message: "Failed to create user" });
      return { error: "Failed to create user" };
    }
  };

  const remove = async (id: number) => {
    const message = "Failed to remove user";
    try {
      const { numDeletedRows } = await repository.remove(id);
      if (!numDeletedRows) {
        throw new Error(message);
      }
      revalidatePath("/", "page");
      return { success: "User removed successfully" };
    } catch (error) {
      logError({ error, message });
      return { error: message };
    }
  };

  const update = async ({ user, id }: { user: UpdateUser; id: number }) => {
    const message = "Failed to update user";
    try {
      const { numUpdatedRows } = await repository.update({ data: user, id });
      if (!numUpdatedRows) {
        throw new Error(message);
      }
      revalidatePath("/", "page");
      return { success: "User updated successfully" };
    } catch (error) {
      logError({ error, message });
      return { error: message };
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
