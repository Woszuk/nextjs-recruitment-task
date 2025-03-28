"use server";

import { NewUser, UpdateUser } from "@/app/lib/db/types";
import { userServices } from "@/app/lib/services/user";

export async function getUser(id: number) {
  return userServices.getOne({ id });
}

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
  return userServices.remove({ conditions: { id } });
}

export async function updateUser({
  user,
  id,
}: {
  user: UpdateUser;
  id: number;
}) {
  return userServices.update({ conditions: { id }, data: user });
}
