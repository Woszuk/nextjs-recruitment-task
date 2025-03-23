import { logger } from "@/app/lib/config/logger";
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

  return {
    getAll,
  };
};

export const userServices = createUserServices();
