import { Address, NewAddress, UpdateAddress } from "@/app/lib/db/types";
import { addressRepository } from "@/app/lib/repositories/address";
import { BaseService } from "@/app/lib/services/base-services";

class AddressServices extends BaseService<Address, NewAddress, UpdateAddress> {
  constructor() {
    super(addressRepository, "Address", "/[userId]/addresses");
  }
}

export const addressServices = new AddressServices();
