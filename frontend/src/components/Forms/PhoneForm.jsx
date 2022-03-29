import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../redux/features/user/userSelectors";
import {
  VStack,
  HStack,
  FormControl,
  FormLabel,
  Input,
  Button,
  Select,
} from "@chakra-ui/react";

const TIPOS_TELEFONO = [
  [1, "Casa"],
  [2, "Teléfono móvil"],
];

const AddressForm = (props) => {
  const { contact, initialData, method } = props;

  const newUrl = method
    ? `/api/v1/phones/${initialData.id}/` // PUT, DELETE initialData.id = address.id
    : `/api/v1/phones/contact/${contact.id}/`; // GET, POST
  const newMethod = method ? method : "post";

  const currentUser = useSelector(selectCurrentUser);
  const [phoneData, setPhoneData] = useState(
    initialData
      ? {
          contact: contact.id,
          phone_type: initialData.phone_type,
          alias: initialData.alias,
          number: initialData.number,
        }
      : {
          contact: contact.id,
          phone_type: "",
          alias: "",
          number: "",
        }
  );

  function handleChange(event) {
    setPhoneData({
      ...phoneData,
      [event.target.name]: event.target.value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    axios({
      url: newUrl,
      method: newMethod,
      data: JSON.stringify(phoneData),
      headers: {
        "Content-Type": "application/json",
        Authorization: currentUser.token,
      },
    })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }

  return (
    <form onSubmit={handleSubmit}>
      <FormControl>
        <FormLabel>Tipo de teléfono</FormLabel>
        <Select
          placeholder="Selecciona un tipo de teléfono"
          name="phone_type"
          onChange={handleChange}
          value={phoneData.phone_type}
        >
          {TIPOS_TELEFONO.map((tipoTelefono) => (
            <option key={tipoTelefono[0]} value={tipoTelefono[0]}>
              {tipoTelefono[1]}
            </option>
          ))}
        </Select>
      </FormControl>
      <FormControl>
        <FormLabel>Number</FormLabel>
        <Input
          name="number"
          value={phoneData.number}
          onChange={handleChange}
        ></Input>
      </FormControl>
      <FormControl>
        <FormLabel>Alias</FormLabel>
        <Input
          name="alias"
          value={phoneData.alias}
          onChange={handleChange}
        ></Input>
      </FormControl>
      <Button type="submit">Guardar cambios</Button>
    </form>
  );
};

export default AddressForm;
