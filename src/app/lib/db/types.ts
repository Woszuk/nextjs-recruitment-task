import { AddressType } from "@/app/lib/enums/address";
import { UserStatus } from "@/app/lib/enums/user";
import { Generated } from "kysely";

export type User = {
  id: Generated<number>;
  first_name?: string;
  last_name: string;
  initials?: string;
  email: string;
  status: UserStatus;
  createdAt: Date;
  updatedAt: Date;
};

export type Address = {
  user_id: string;
  address_type: AddressType;
  valid_form: Date;
  post_code: string;
  city: string;
  country_code: string;
  street: string;
  building_number: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Database = {
  users: User;
  users_addresses: Address;
};
