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

const ESTADOS = [
  ["AGU", "Aguascalientes"],
  ["BCN", "Baja California"],
  ["BCS", "Baja California Sur"],
  ["CAM", "Campeche"],
  ["CHP", "Chiapas"],
  ["CHH", "Chihuahua"],
  ["CMX", "Ciudad de México"],
  ["COA", "Coahuila"],
  ["COL", "Colima"],
  ["DUR", "Durango"],
  ["GUA", "Guanajuato"],
  ["GRO", "Guerrero"],
  ["HID", "Hidalgo"],
  ["JAL", "Jalisco"],
  ["MEX", "México"],
  ["MIC", "Michoacán"],
  ["MOR", "Morelos"],
  ["NAY", "Nayarit"],
  ["NLE", "Nuevo León"],
  ["OAX", "Oaxaca"],
  ["PUE", "Puebla"],
  ["QUE", "Querétaro"],
  ["ROO", "Quintana Roo"],
  ["SLP", "San Luis Potosí"],
  ["SIN", "Sinaloa"],
  ["SON", "Sonora"],
  ["TAB", "Tabasco"],
  ["TAM", "Tamaulipas"],
  ["TLA", "Tlaxcala"],
  ["VER", "Veracruz"],
  ["YUC", "Yucatán"],
  ["ZAC", "Zacatecas"],
];

const AddressForm = (props) => {
  const { contact, initialData, method } = props;
  console.log("props", props);

  const newUrl = method
    ? `/api/v1/addresses/${initialData.id}/` // PUT, DELETE initialData.id = address.id
    : `/api/v1/addresses/contact/${contact.id}/`; // GET, POST
  const newMethod = method ? method : "post";

  const currentUser = useSelector(selectCurrentUser);
  const [addressData, setAddressData] = useState(
    initialData
      ? {
          contact: contact.id,
          street_name: initialData.street_name,
          external_number: initialData.external_number,
          internal_number: initialData.internal_number,
          district: initialData.district,
          city: initialData.city,
          state: initialData.state,
          reference: initialData.reference,
        }
      : {
          contact: contact.id,
          street_name: "",
          external_number: "",
          internal_number: "",
          district: "",
          city: "",
          state: "",
          reference: "",
        }
  );

  function handleChange(event) {
    setAddressData({
      ...addressData,
      [event.target.name]: event.target.value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log("method", newMethod, "data", addressData);
    axios({
      url: newUrl,
      method: newMethod,
      data: JSON.stringify(addressData),
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
        <FormLabel>Calle</FormLabel>
        <Input
          name="street_name"
          value={addressData.street_name}
          onChange={handleChange}
        ></Input>
      </FormControl>
      <FormControl>
        <FormLabel>Número exterior</FormLabel>
        <Input
          name="external_number"
          value={addressData.external_number}
          onChange={handleChange}
        ></Input>
      </FormControl>
      <FormControl>
        <FormLabel>Número interior</FormLabel>
        <Input
          name="internal_number"
          value={addressData.internal_number}
          onChange={handleChange}
        ></Input>
      </FormControl>
      <FormControl>
        <FormLabel>Colonia</FormLabel>
        <Input
          name="district"
          value={addressData.district}
          onChange={handleChange}
        ></Input>
      </FormControl>
      <FormControl>
        <FormLabel>Ciudad</FormLabel>
        <Input
          name="city"
          value={addressData.city}
          onChange={handleChange}
        ></Input>
      </FormControl>
      <FormControl>
        <FormLabel>Estado</FormLabel>
        <Select
          placeholder="Selecciona un estado"
          name="state"
          onChange={handleChange}
          value={addressData.state}
        >
          {ESTADOS.map((estado) => (
            <option key={estado[0]} value={estado[0]}>
              {estado[1]}
            </option>
          ))}
        </Select>
      </FormControl>
      <FormControl>
        <FormLabel>Referencia</FormLabel>
        <Input
          name="reference"
          value={addressData.reference}
          onChange={handleChange}
        ></Input>
      </FormControl>
      <Button type="submit">Guardar cambios</Button>
    </form>
  );
};

export default AddressForm;
