import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../redux/features/user/userSelectors";
import axios from "axios";

import ContactsContainer from "../components/ContactsContainer";
import ContactInfoContainer from "../components/ContactInfoContainer";

import ContactForm from "../components/Forms/ContactForm";

import { Heading, VStack, Button } from "@chakra-ui/react";

const HomePage = () => {
  const currentUser = useSelector(selectCurrentUser);
  const token = currentUser.token;
  const [contacts, setContacts] = useState([]);
  const [contact, setContact] = useState(null);

  const [addingContact, setAddingContact] = useState(false);

  useEffect(() => {
    axios({
      url: "/api/v1/contacts/",
      method: "get",
      headers: {
        Authorization: token,
      },
    })
      .then((res) => res.data)
      .then((data) => setContacts(data));
  }, []);

  return (
    <VStack border="1px">
      <VStack>
        <Heading>Contactos</Heading>
        <Button
          onClick={() => {
            setContact(null);
            setAddingContact(!addingContact);
          }}
        >
          Añadir contacto
        </Button>
        <ContactsContainer
          contacts={contacts}
          setContact={setContact}
          setAddingContact={setAddingContact}
        />
      </VStack>
      {addingContact ? (
        <VStack>
          <Heading>Añadir contacto</Heading>
          <ContactForm />
        </VStack>
      ) : null}
      {contact ? (
        <VStack>
          <Heading>Información del contacto</Heading>
          <ContactInfoContainer contact={contact} token={token} />
        </VStack>
      ) : null}
    </VStack>
  );
};

export default HomePage;
