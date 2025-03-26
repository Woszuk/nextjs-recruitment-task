"use server";

import AddressesPage from "@/app/components/pages/Addresses";
import { PAGE_SIZE } from "@/app/constants";
import { getUserWithAddresses } from "@/app/lib/actions/address-actions";

export default async function Addresses({
  params,
  searchParams,
}: {
  params: Promise<{ userId: number }>;
  searchParams: Promise<{ page: string }>;
}) {
  const page = Number((await searchParams).page) || 1;

  const { userId } = await params;
  const { error, addresses, totalItems } = await getUserWithAddresses({
    page,
    pageSize: PAGE_SIZE,
    userId,
  });

  return (
    <AddressesPage
      addresses={addresses}
      totalItems={totalItems}
      userId={userId}
      error={error}
      page={page}
    />
  );
}
