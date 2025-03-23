"use server";

import { userServices } from "@/app/lib/services/user";

export async function getUsers() {
  return userServices.getAll();
}
