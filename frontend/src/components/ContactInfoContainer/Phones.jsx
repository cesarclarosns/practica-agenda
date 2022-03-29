import React, { useState } from "react";
import { VStack, Heading, HStack, Button } from "@chakra-ui/react";

import PhoneForm from "../Forms/PhoneForm";
import Phone from "./Phone";

export default function ContactPhones(props) {
  const { contactPhones, contact } = props;

  const [adding, setAdding] = useState(false);

  return (
    <VStack border="1px">
      <Heading fontSize="2xl">Teléfonos del contacto</Heading>
      <HStack>
        <Button onClick={() => setAdding(true)}>Añadir teléfono</Button>
      </HStack>
      {adding && (
        <>
          <PhoneForm contact={contact}></PhoneForm>
          <Button onClick={() => setAdding(false)}>Volver</Button>
        </>
      )}
      {contactPhones.map((contactPhone) => (
        <Phone
          key={contactPhone.id}
          contactPhone={contactPhone}
          contact={contact}
        />
      ))}
    </VStack>
  );
}
