import { NewUser, UpdateUser, User } from "@/app/lib/db/types";
import { userRepository } from "@/app/lib/repositories/user";
import { BaseService } from "@/app/lib/services/base-services";

class UserServices extends BaseService<User, NewUser, UpdateUser> {
  constructor() {
    super(userRepository, "User", "/");
  }
}

export const userServices = new UserServices();
