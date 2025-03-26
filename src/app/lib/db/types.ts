import { AddressType } from "@/app/lib/enums/address";
import { UserStatus } from "@/app/lib/enums/user";
import { ISO3166Alpha3Code } from "@/app/lib/schemas/address-schema";
import { Generated, Insertable, Selectable, Updateable } from "kysely";

export type UserTable = {
  id: Generated<number>;
  first_name?: string;
  last_name: string;
  initials?: string;
  email: string;
  status: UserStatus;
  created_at: Generated<Date>;
  updated_at: Generated<Date>;
};

export type User = Selectable<UserTable>;
export type NewUser = Insertable<UserTable>;
export type UpdateUser = Updateable<UserTable>;

export type AddressTable = {
  user_id: number;
  address_type: AddressType;
  valid_from: Date;
  post_code: string;
  city: string;
  country_code: ISO3166Alpha3Code;
  street: string;
  building_number: string;
  created_at: Generated<Date>;
  updated_at: Generated<Date>;
};

export type NewAddress = Insertable<AddressTable>;
export type UpdateAddress = Updateable<AddressTable>;
export type Address = Selectable<AddressTable>;
export type AddressWithUserName = Address & { name: string };

export type Database = {
  users: UserTable;
  users_addresses: AddressTable;
};
