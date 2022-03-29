import React, { useState } from "react";
import { Text, VStack, Image, Heading, HStack, Button } from "@chakra-ui/react";

import ContactForm from "../Forms/ContactForm";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../redux/features/user/userSelectors";

const Info = (props) => {
  const { contact } = props;
  const currentUser = useSelector(selectCurrentUser);
  const [editing, setEditing] = useState(false);

  function deleteContact() {
    axios({
      url: `/api/v1/contacts/${contact.id}/`,
      method: "delete",
      headers: {
        Authorization: currentUser.token,
      },
    })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }

  return (
    <VStack border="1px">
      <Heading fontSize="2xl">Detalles del contacto</Heading>
      <VStack border="1px">
        <HStack>
          <Button onClick={() => setEditing(true)}>Editar contacto</Button>
          <Button onClick={() => deleteContact()}>Eliminar contacto</Button>
        </HStack>
        <VStack>
          {!editing ? (
            <>
              <Image boxSize="100px" src={contact.image} />
              <Text>Nombre: {contact.first_name}</Text>
              <Text>Apellidos: {contact.last_name}</Text>
              <Text>Fecha de nacimiento: {contact.birthdate}</Text>
            </>
          ) : (
            <ContactForm
              initialData={contact}
              method="put"
              setEditing={setEditing}
            />
          )}
        </VStack>
      </VStack>
    </VStack>
  );
};

export default Info;
