import { Address, NewAddress, UpdateAddress } from "@/app/lib/db/types";
import { BaseRepository } from "@/app/lib/repositories/base-repository";

class AddressRepository extends BaseRepository<
  Address,
  NewAddress,
  UpdateAddress
> {
  constructor() {
    super("users_addresses");
  }
}

export const addressRepository = new AddressRepository();
