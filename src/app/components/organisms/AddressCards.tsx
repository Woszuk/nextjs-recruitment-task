import AddressCard from "@/app/components/molecules/AddressCard";
import { AddressWithUserName } from "@/app/lib/db/types";
import { capitalize } from "@/app/utils/capitalize";

type AddressCardsProps = {
  addresses: AddressWithUserName[];
};

export default function AddressCards({ addresses }: AddressCardsProps) {
  return (
    <>
      {addresses.map((address, index) => {
        return (
          <AddressCard key={index} address={address} name={address.name}>
            <div className="flex flex-col">
              <p className="font-bold">
                Address Type: {capitalize(address.address_type)}
              </p>
              <div className="flex gap-2">
                <p>{address.street}</p>
                <p>{address.building_number}</p>
              </div>
              <div className="flex gap-2">
                <p>{address.post_code}</p>
                <p>{address.city}</p>
              </div>
              <div>
                <p>{address.country_code}</p>
              </div>
            </div>
          </AddressCard>
        );
      })}
    </>
  );
}
