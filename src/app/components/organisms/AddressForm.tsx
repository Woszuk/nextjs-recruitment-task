import { useForm, Controller } from "react-hook-form";
import { capitalize } from "@/app/utils/capitalize";
import { zodResolver } from "@hookform/resolvers/zod";
import Form from "@/app/components/templates/Form";
import Select from "@/app/components/molecules/Select";
import TextField from "@/app/components/molecules/TextField";
import { Address } from "@/app/lib/db/types";
import {
  AddressFormData,
  addressSchema,
} from "@/app/lib/schemas/address-schema";
import { AddressType } from "@/app/lib/enums/address";

type AddressFormProps = {
  onSubmit: (data: AddressFormData) => void;
  title: string;
  buttonLabel?: string;
  address?: Address;
};

export default function AddressForm({
  address,
  onSubmit,
  title,
  buttonLabel = "Create",
}: AddressFormProps) {
  const { handleSubmit, control } = useForm<AddressFormData>({
    defaultValues: {
      address_type: address?.address_type || AddressType.HOME,
      post_code: address?.post_code || "",
      building_number: address?.building_number || "",
      city: address?.city || "",
      country_code: address?.country_code || "",
      street: address?.street || "",
      valid_from: address?.valid_from
        ? new Date(address.valid_from).toISOString().slice(0, 16)
        : new Date().toISOString().slice(0, 16),
    },
    resolver: zodResolver(addressSchema),
  });

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      title={title}
      buttonLabel={buttonLabel}
    >
      <Controller
        name="address_type"
        control={control}
        render={({ field, fieldState }) => (
          <Select
            {...field}
            options={Object.entries(AddressType).map(([key, value]) => ({
              label: capitalize(value),
              value: key,
            }))}
            id="address_type"
            label="Address Type"
            error={fieldState.error?.message}
          />
        )}
      />
      <Controller
        name="post_code"
        control={control}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            id="post_code"
            label="Post Code"
            error={fieldState.error?.message}
          />
        )}
      />
      <Controller
        name="city"
        control={control}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            id="city"
            label="City"
            error={fieldState.error?.message}
          />
        )}
      />
      <Controller
        name="country_code"
        control={control}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            id="country_code"
            label="Country Code"
            error={fieldState.error?.message}
          />
        )}
      />
      <Controller
        name="street"
        control={control}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            id="street"
            label="Street"
            error={fieldState.error?.message}
          />
        )}
      />
      <Controller
        name="building_number"
        control={control}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            id="building_number"
            label="Building Number"
            error={fieldState.error?.message}
          />
        )}
      />

      <Controller
        name="valid_from"
        control={control}
        render={({ field, fieldState }) => (
          <TextField
            type="datetime-local"
            {...field}
            id="valid_from"
            label="Valid From"
            error={fieldState.error?.message}
          />
        )}
      />
    </Form>
  );
}
