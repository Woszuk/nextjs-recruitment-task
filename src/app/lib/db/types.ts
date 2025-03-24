import { AddressType } from "@/app/lib/enums/address";
import { UserStatus } from "@/app/lib/enums/user";
import { Generated, Selectable } from "kysely";

export type UserTable = {
  id: Generated<number>;
  first_name?: string;
  last_name: string;
  initials?: string;
  email: string;
  status: UserStatus;
  createdAt: Date;
  updatedAt: Date;
};

export type User = Selectable<UserTable>;

export type AddressTable = {
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

export type Address = Selectable<AddressTable>;

export type Database = {
  users: UserTable;
  users_addresses: AddressTable;
};
