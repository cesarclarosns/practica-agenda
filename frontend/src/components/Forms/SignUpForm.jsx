import React, { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { signInSuccess } from "../../redux/features/user/userSlice";

import {
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
} from "@chakra-ui/react";

/*
json
username
email
password1
password2
*/

const SignUpForm = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  function handleChange(event) {
    const { value, name } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  function handleSubmit(event) {
    event.preventDefault();
    const data = {
      username: formData.username,
      email: formData.email,
      password1: formData.password,
      password2: formData.password,
    };

    axios({
      url: "/api/v1/auth/registration/",
      method: "post",
      data: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.data)
      .then((data) => dispatch(signInSuccess(data)))
      .catch((err) => console.log(err));
  }

  return (
    <VStack>
      <form onSubmit={handleSubmit}>
        <FormControl isRequired>
          <FormLabel>Nombre de usuario</FormLabel>
          <Input
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Correo electrónico</FormLabel>
          <Input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Contraseña</FormLabel>
          <Input
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
          />
        </FormControl>

        <Button type="submit">Continuar</Button>
      </form>
    </VStack>
  );
};

export default SignUpForm;
