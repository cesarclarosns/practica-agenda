import React, { useState } from "react";
import { Heading, VStack, Text, HStack, Button } from "@chakra-ui/react";

import AddressForm from "../Forms/AddressForm";
import Address from "./Address";

export default function Addresses(props) {
  const { contactAddresses, contact } = props;

  const [adding, setAdding] = useState(false);
  return (
    <VStack border="1px">
      <Heading fontSize="2xl">Direcciones del contacto</Heading>
      <HStack>
        <Button onClick={() => setAdding(true)}>Añadir dirreción</Button>
      </HStack>
      {adding && (
        <>
          <AddressForm contact={contact} />
          <Button onClick={() => setAdding(false)}>Volver</Button>
        </>
      )}
      {contactAddresses.map((contactAddress) => (
        <Address
          key={contactAddress.id}
          contactAddress={contactAddress}
          contact={contact}
        />
      ))}
    </VStack>
  );
}
