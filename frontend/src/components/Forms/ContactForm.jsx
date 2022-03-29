import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  HStack,
} from "@chakra-ui/react";
import axios from "axios";

import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../redux/features/user/userSelectors";

const ContactForm = (props) => {
  const { initialData, setEditing, method } = props;

  const newUrl = method
    ? `/api/v1/contacts/${initialData.id}/`
    : "/api/v1/contacts/";
  const newMethod = method ? method : "post";

  const currentUser = useSelector(selectCurrentUser);
  const [contactData, setContactData] = useState(
    initialData
      ? {
          user: currentUser.userId,
          first_name: initialData.first_name,
          last_name: initialData.last_name,
          birthdate: initialData.birthdate,
        }
      : {
          user: currentUser.userId,
          first_name: "",
          last_name: "",
          birthdate: "",
        }
  );
  const [contactImage, setContactImage] = useState(
    initialData
      ? {
          image: initialData.image,
        }
      : {
          image: [],
        }
  );

  function handleChange(event) {
    if (event.target.name === "image") {
      setContactImage({
        image: event.target.files,
      });
    } else {
      setContactData({
        ...contactData,
        [event.target.name]: event.target.value,
      });
    }
  }

  function handleSubmit(event) {
    event.preventDefault();

    let formData = new FormData();
    formData.append("user", contactData.user);
    formData.append("first_name", contactData.first_name);
    formData.append("last_name", contactData.last_name);
    formData.append("birthdate", contactData.birthdate);
    formData.append("image", contactImage.image[0]);

    axios({
      url: newUrl,
      method: newMethod,
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: currentUser.token,
      },
    })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }

  return (
    <form onSubmit={handleSubmit}>
      <FormControl>
        <FormLabel>Nombre</FormLabel>
        <Input
          name="first_name"
          value={contactData.first_name}
          onChange={handleChange}
        ></Input>
      </FormControl>
      <FormControl>
        <FormLabel>Apellidos</FormLabel>
        <Input
          name="last_name"
          value={contactData.last_name}
          onChange={handleChange}
        ></Input>
      </FormControl>
      <FormControl>
        <FormLabel>Fecha de cumpleaños</FormLabel>
        <Input
          type="date"
          name="birthdate"
          value={contactData.birthdate}
          onChange={handleChange}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Imagen</FormLabel>
        <Input
          type="file"
          name="image"
          accept="image/jpeg,image/png"
          onChange={handleChange}
        ></Input>
      </FormControl>
      <HStack>
        {setEditing && (
          <Button onClick={() => setEditing(false)}>Volver</Button>
        )}
        <Button type="submit">Guardar cambios</Button>
      </HStack>
    </form>
  );
};

export default ContactForm;
