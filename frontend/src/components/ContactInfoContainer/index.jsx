import axios from "axios";
import React, { useEffect, useState } from "react";

import Info from "./Info";
import Addresses from "./Addresses";
import Phones from "./Phones";
import { VStack } from "@chakra-ui/react";

export default function ContactInfoContainer(props) {
  const { contact, token } = props;
  const [contactAddresses, setContactAddresses] = useState([]);
  const [contactPhones, setContactPhones] = useState([]);

  useEffect(() => {
    // Fetch addrresses
    axios({
      url: `/api/v1/addresses/contact/${contact.id}`,
      method: "get",
      headers: { Authorization: token },
    })
      .then((res) => res.data)
      .then((data) => setContactAddresses(data));
    // Fetch phones
    axios({
      url: `/api/v1/phones/contact/${contact.id}`,
      method: "get",
      headers: { Authorization: token },
    })
      .then((res) => res.data)
      .then((data) => setContactPhones(data));
  }, [contact, token]);

  return (
    <VStack>
      <Info contact={contact} />
      <Addresses contact={contact} contactAddresses={contactAddresses} />
      <Phones contact={contact} contactPhones={contactPhones} />
    </VStack>
  );
}
