import React from "react";

import Address from "@/components/Address/Address";
import AddressBook from "@/components/AddressBook/AddressBook";
import Button from "@/components/Button/Button";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";
import Form from "@/components/Form/Form";
import InputText from "@/components/InputText/InputText";
import Radio from "@/components/Radio/Radio";
import Section from "@/components/Section/Section";
import useAddressBook from "@/hooks/useAddressBook";
import { useFormFields } from "@/hooks/useFormFields";

import type { Address as AddressType } from "./types";

interface RawAddress {
  city: string;
  houseNumber: string;
  postcode: string;
  street: string;
  lat: number;
  long: number;
}

function App() {
  /**
   * Form fields states
   * TODO: Write a custom hook to set form fields in a more generic way:
   * - Hook must expose an onChange handler to be used by all <InputText /> and <Radio /> components
   * - Hook must expose all text form field values, like so: { postCode: '', houseNumber: '', ...etc }
   * - Remove all individual React.useState
   * - Remove all individual onChange handlers, like handlePostCodeChange for example
   */
  const { fields, handleChange, clearFields } = useFormFields({
    postCode: "",
    houseNumber: "",
    firstName: "",
    lastName: "",
    selectedAddress: ""
  });

  /**
   * Results states
   */
  const [error, setError] = React.useState<undefined | string>(undefined);
  const [addresses, setAddresses] = React.useState<AddressType[]>([]);
  const [loading, setLoading] = React.useState(false);

  /**
   * Redux actions
   */
  const { addAddress } = useAddressBook();

  // Transform address function to add house number
  const transformAddress = (address: RawAddress, houseNumber: string): AddressType => ({
    ...address,
    houseNumber,
    id: `${address.street}-${houseNumber}-${Math.random().toString(36).substring(2, 11)}`,
    firstName: "",
    lastName: ""
  });

  /** TODO: Fetch addresses based on houseNumber and postCode using the local BE api
   * - Example URL of API: ${process.env.NEXT_PUBLIC_URL}/api/getAddresses?postcode=1345&streetnumber=350
   * - Ensure you provide a BASE URL for api endpoint for grading purposes!
   * - Handle errors if they occur
   * - Handle successful response by updating the `addresses` in the state using `setAddresses`
   * - Make sure to add the houseNumber to each found address in the response using `transformAddress()` function
   * - Ensure to clear previous search results on each click
   * - Bonus: Add a loading state in the UI while fetching addresses
   */

  const handleAddressSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(undefined);
    setAddresses([]);
    setLoading(true);

    try {
      const baseUrl = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000';
      const response = await fetch(
        `${baseUrl}/api/getAddresses?postcode=${fields.postCode}&streetnumber=${fields.houseNumber}`
      );

      const data = await response.json();

      if (data.status === "ok" && data.details) {
        const transformedAddresses = data.details.map((address: RawAddress) =>
          transformAddress(address, fields.houseNumber)
        );
        setAddresses(transformedAddresses);
      } else {
        setError(data.errormessage || "Failed to fetch addresses");
      }
    } catch (err) {
      setError("Failed to fetch addresses. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  /** Add basic validation to ensure first name and last name fields aren't empty */
  const handlePersonSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate first name and last name
    if (!fields.firstName.trim() || !fields.lastName.trim()) {
      setError("First name and last name fields mandatory!");
      return;
    }

    if (!fields.selectedAddress || !addresses.length) {
      setError(
        "No address selected, try to select an address or find one if you haven't"
      );
      return;
    }

    const foundAddress = addresses.find(
      (address) => address.id === fields.selectedAddress
    );

    if (!foundAddress) {
      setError("Selected address not found");
      return;
    }

    addAddress({ ...foundAddress, firstName: fields.firstName, lastName: fields.lastName });
    setError(undefined);
  };

  const handleClearFields = () => {
    clearFields();
    setAddresses([]);
    setError(undefined);
  };

  const addressFormEntries = [
    {
      name: "postCode",
      placeholder: "Post Code",
      value: fields.postCode,
      onChange: handleChange
    },
    {
      name: "houseNumber",
      placeholder: "House number",
      value: fields.houseNumber,
      onChange: handleChange
    }
  ];

  const personFormEntries = [
    {
      name: "firstName",
      placeholder: "First name",
      value: fields.firstName,
      onChange: handleChange
    },
    {
      name: "lastName",
      placeholder: "Last name",
      value: fields.lastName,
      onChange: handleChange
    }
  ];

  return (
    <main>
      <Section>
        <h1>
          Create your own address book!
          <br />
          <small>
            Enter an address by postcode add personal info and done! 👏
          </small>
        </h1>

        <Form
          label="🏠 Find an address"
          loading={loading}
          formEntries={addressFormEntries}
          onFormSubmit={handleAddressSubmit}
          submitText="Find"
        />

        {addresses.length > 0 &&
          addresses.map((address) => {
            return (
              <Radio
                name="selectedAddress"
                id={address.id}
                key={address.id}
                value={address.id}
                checked={fields.selectedAddress === address.id}
                onChange={handleChange}
              >
                <Address {...address} />
              </Radio>
            );
          })}

        {fields.selectedAddress && (
          <Form
            label="✏️ Add personal info to address"
            loading={false}
            formEntries={personFormEntries}
            onFormSubmit={handlePersonSubmit}
            submitText="Add to addressbook"
          />
        )}

        <ErrorMessage message={error || ""} />

        <Button variant="secondary" onClick={handleClearFields}>
          Clear all fields
        </Button>
      </Section>

      <Section variant="dark">
        <AddressBook />
      </Section>
    </main>
  );
}

export default App;
