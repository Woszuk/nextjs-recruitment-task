"use server";

import AddressesPage from "@/app/components/pages/Addresses";
import { PAGE_SIZE } from "@/app/constants";
import { getAddresses } from "@/app/lib/actions/address-actions";
import { getUser } from "@/app/lib/actions/user-actions";

export default async function Addresses({
  params,
  searchParams,
}: {
  params: Promise<{ userId: number }>;
  searchParams: Promise<{ page: string }>;
}) {
  const page = Number((await searchParams).page) || 1;

  const { userId } = await params;
  const { data, error, totalItems } = await getAddresses({
    page,
    pageSize: PAGE_SIZE,
    userId,
  });

  const { data: userData, error: userError } = await getUser(userId);

  return (
    <AddressesPage
      addresses={data}
      user={userData}
      totalItems={totalItems}
      userId={userId}
      error={error || userError}
      page={page}
    />
  );
}
