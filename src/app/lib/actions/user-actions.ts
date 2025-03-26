"use server";

import { NewUser, UpdateUser } from "@/app/lib/db/types";
import { userServices } from "@/app/lib/services/user";

export async function getUsers({
  pageSize,
  page,
}: {
  pageSize: number;
  page: number;
}) {
  return userServices.getAll({ page, pageSize });
}

export async function createUser(user: NewUser) {
  return userServices.create(user);
}

export async function deleteUser(id: number) {
  return userServices.remove(id);
}

export async function updateUser({
  user,
  id,
}: {
  user: UpdateUser;
  id: number;
}) {
  return userServices.update({ user, id });
}
