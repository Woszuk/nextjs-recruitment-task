"use server";

import AddressesPage from "@/app/components/pages/Addresses";
import { getUserWithAddresses } from "@/app/lib/actions/address-actions";

export default async function Addresses({
  params,
}: {
  params: Promise<{ userId: number }>;
}) {
  const { userId } = await params;
  const { error, addresses } = await getUserWithAddresses(userId);

  return <AddressesPage addresses={addresses} userId={userId} error={error} />;
}
