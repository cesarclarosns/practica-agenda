import React, { useState } from "react";
import { VStack, HStack, Button, Text } from "@chakra-ui/react";

import PhoneForm from "../Forms/PhoneForm";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../redux/features/user/userSelectors";

const Phone = ({ contactPhone, contact }) => {
  const [editing, setEditing] = useState(false);
  const currentUser = useSelector(selectCurrentUser);

  function deletePhone() {
    axios({
      url: `/api/v1/phones/${contactPhone.id}`,
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
      <VStack border="1px" key={contactPhone.id}>
        <HStack>
          <Button onClick={() => setEditing(true)}>Editar teléfono</Button>
          <Button onClick={() => deletePhone()}>Eliminar teléfono</Button>
        </HStack>
        <VStack>
          {!editing ? (
            <>
              <Text>Tipo: {contactPhone.phone_type_display_value}</Text>
              <Text>Alias: {contactPhone.alias}</Text>
              <Text>Número: {contactPhone.number}</Text>
            </>
          ) : (
            <>
              <PhoneForm
                contact={contact}
                method="put"
                initialData={contactPhone}
              />
              <Button onClick={() => setEditing(false)}>Volver</Button>
            </>
          )}
        </VStack>
      </VStack>
    </>
  );
};

export default Phone;
