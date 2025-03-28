import { useForm, Controller } from "react-hook-form";
import { capitalize } from "@/app/utils/capitalize";
import { zodResolver } from "@hookform/resolvers/zod";
import Form from "@/app/components/molecules/Form";
import Select from "@/app/components/molecules/Select";
import TextField from "@/app/components/molecules/TextField";
import { Address } from "@/app/lib/db/types";
import {
  AddressFormData,
  addressSchema,
  ISO_3166_1_ALPHA3_CODES,
} from "@/app/lib/schemas/address-schema";
import { AddressType } from "@/app/lib/enums/address";
import AddressPreview from "@/app/components/atoms/AddressPreview";
import { toLocalDatetime } from "@/app/utils/date";

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
  const { handleSubmit, control, watch } = useForm<AddressFormData>({
    defaultValues: {
      address_type: address?.address_type || AddressType.HOME,
      post_code: address?.post_code || "",
      building_number: address?.building_number || "",
      city: address?.city || "",
      country_code: address?.country_code || undefined,
      street: address?.street || "",
      valid_from: address?.valid_from
        ? toLocalDatetime(address.valid_from)
        : toLocalDatetime(new Date()),
    },
    resolver: zodResolver(addressSchema),
  });

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      title={title}
      buttonLabel={buttonLabel}
    >
      <AddressPreview values={watch} />
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
          <Select
            {...field}
            options={ISO_3166_1_ALPHA3_CODES.map((val) => ({
              label: val,
              value: val,
            }))}
            id="country_code"
            label="Country Code"
            error={fieldState.error?.message}
          />
        )}
      />

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
