import { AddressType } from "@/app/lib/enums/address";
import { z } from "zod";

export const addressSchema = z.object({
  address_type: z.nativeEnum(AddressType),
  post_code: z.string(),
  city: z.string(),
  country_code: z.string(),
  street: z.string(),
  building_number: z.string(),
  valid_from: z.string(),
});

export type AddressFormData = z.infer<typeof addressSchema>;
