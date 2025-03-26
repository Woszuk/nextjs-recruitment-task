type AddressProps = {
  street: string;
  buildingNumber: string;
  postCode: string;
  city: string;
  countryCode: string;
};

export default function Address(address: AddressProps) {
  return (
    <div>
      <div className="flex gap-2">
        <p>{address.street}</p>
        <p>{address.buildingNumber}</p>
      </div>
      <div className="flex gap-2">
        <p>{address.postCode}</p>
        <p>{address.city}</p>
      </div>
      <div>
        <p>{address.countryCode}</p>
      </div>
    </div>
  );
}
