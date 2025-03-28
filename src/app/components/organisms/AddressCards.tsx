import Address from "@/app/components/atoms/Address";
import AddressCard from "@/app/components/molecules/AddressCard";
import { Address as AddressType } from "@/app/lib/db/types";
import { capitalize } from "@/app/utils/capitalize";

type AddressCardsProps = {
  addresses: AddressType[];
};

export default function AddressCards({ addresses }: AddressCardsProps) {
  return (
    <>
      {addresses.map((address, index) => {
        return (
          <AddressCard key={index} address={address}>
            <div className="flex flex-col">
              <p className="font-bold">
                Address Type: {capitalize(address.address_type)}
              </p>
              <Address
                buildingNumber={address.building_number}
                city={address.city}
                countryCode={address.country_code}
                postCode={address.post_code}
                street={address.street}
              />
            </div>
          </AddressCard>
        );
      })}
    </>
  );
}
