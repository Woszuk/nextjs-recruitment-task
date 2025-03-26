import Address from "@/app/components/atoms/Address";
import { AddressFormData } from "@/app/lib/schemas/address-schema";
import { UseFormWatch } from "react-hook-form";

type AddressPreviewProps = {
  values: UseFormWatch<AddressFormData>;
};

export default function AddressPreview({ values }: AddressPreviewProps) {
  return (
    <div className="relative w-full flex border-1 p-2 rounded-sm flex-col">
      <p className="text-sm uppercase font-bold">Preview</p>

      <div className="self-center">
        <Address
          buildingNumber={values().building_number}
          city={values().city}
          countryCode={values().country_code}
          postCode={values().post_code}
          street={values().street}
        />
      </div>
    </div>
  );
}
