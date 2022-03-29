import React from "react";
import { Box, HStack, Image, Text, VStack } from "@chakra-ui/react";

export default function ContactsContainer(props) {
  const { contacts, setContact, setAddingContact } = props;

  return (
    <HStack>
      {contacts.map((contact) => (
        <VStack
          border="1px"
          key={contact.id}
          onClick={() => {
            setContact(contact);
            setAddingContact(false);
          }}
        >
          <Image boxSize="100px" src={contact.image}></Image>
          <Text>
            {contact.first_name} {contact.last_name}
          </Text>
        </VStack>
      ))}
    </HStack>
  );
}
