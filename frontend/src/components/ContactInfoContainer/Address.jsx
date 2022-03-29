import React, { useState } from "react";
import { VStack, HStack, Button, Text } from "@chakra-ui/react";

import AddressForm from "../Forms/AddressForm";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../redux/features/user/userSelectors";

const Address = ({ contactAddress, contact }) => {
  const [editing, setEditing] = useState(false);
  const currentUser = useSelector(selectCurrentUser);

  function deleteAddress() {
    console.log("contactAddress", contactAddress);
    axios({
      url: `/api/v1/addresses/${contactAddress.id}`,
      method: "delete",
      headers: {
        Authorization: currentUser.token,
      },
    })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }

  return (
    <>
      <VStack border="1px" key={contactAddress.id}>
        <HStack>
          <Button onClick={() => setEditing(true)}>Editar dirección</Button>
          <Button onClick={() => deleteAddress()}>Eliminar dirección</Button>
        </HStack>
        <VStack>
          {!editing ? (
            <>
              <Text>Calle: {contactAddress.street_name}</Text>
              <Text>Número exterior: {contactAddress.external_number}</Text>
              <Text>Número interior: {contactAddress.internal_number}</Text>
              <Text>Colonia: {contactAddress.district}</Text>
              <Text>Ciudad: {contactAddress.city}</Text>
              <Text>Estado: {contactAddress.state_display_value}</Text>
              <Text>Referencia: {contactAddress.reference}</Text>
            </>
          ) : (
            <>
              <AddressForm
                contact={contact}
                method="put"
                initialData={contactAddress}
              />
              <Button onClick={() => setEditing(false)}>Volver</Button>
            </>
          )}
        </VStack>
      </VStack>
    </>
  );
};

export default Address;
