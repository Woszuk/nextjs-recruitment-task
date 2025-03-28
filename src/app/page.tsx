"use server";

import { PAGE_SIZE } from "@/app/constants";
import UsersPage from "@/app/components/pages/Users";
import { getUsers } from "@/app/lib/actions/user-actions";

export default async function Users({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) {
  const page = Number((await searchParams).page) || 1;

  const { error, data, totalItems } = await getUsers({
    pageSize: PAGE_SIZE,
    page,
  });

  return (
    <UsersPage users={data} totalItems={totalItems} error={error} page={page} />
  );
}
