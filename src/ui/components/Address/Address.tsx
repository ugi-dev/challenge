import type React from "react";
import type { AddressProps } from "./Address.types";
import $ from "./Address.module.css";

const Address: React.FC<AddressProps> = (address) => {
  const displayedAddress = `${address.street} ${address.houseNumber}, ${address.postcode}, ${address.city}`;
  return <address className={$.address}>{displayedAddress}</address>;
};

export default Address;
