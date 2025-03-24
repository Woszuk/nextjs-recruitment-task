"use server";

import { NewUser } from "@/app/lib/db/types";
import { userServices } from "@/app/lib/services/user";

export async function getUsers() {
  return userServices.getAll();
}

export async function createUser(user: NewUser) {
  return userServices.create(user);
}
