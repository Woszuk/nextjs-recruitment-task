import { NewUser, UpdateUser, User } from "@/app/lib/db/types";
import { BaseRepository } from "@/app/lib/repositories/base-repository";

class UserRepository extends BaseRepository<User, NewUser, UpdateUser> {
  constructor() {
    super("users");
  }
}

export const userRepository = new UserRepository();
