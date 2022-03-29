import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../../redux/features/user/userSlice";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
} from "@chakra-ui/react";

import axios from "axios";

const SignInForm = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({
    username: "",
    password: "",
    result: "",
  });

  function handleChange(event) {
    const { value, name } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  function handleSubmit(event) {
    event.preventDefault();
    axios({
      url: "/api/v1/auth/login/",
      method: "post",
      data: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.data)
      .then((data) => {
        dispatch(signInSuccess(data));
      })
      .catch((err) => {
        console.log(err);
        setFormErrors({
          ...formErrors,
          result: "Nombre de usuario o contraseña incorrectos.",
        });
      });
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
          <FormLabel>Contraseña</FormLabel>
          <Input
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
          />
        </FormControl>

        <Button type="submit">Iniciar sesión</Button>
        {formErrors.result && <div>{formErrors.result}</div>}
      </form>
    </VStack>
  );
};

export default SignInForm;
