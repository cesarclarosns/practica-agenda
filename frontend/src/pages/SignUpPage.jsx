import React from "react";
import SignUpForm from "../components/Forms/SignUpForm";

import { VStack, Heading } from "@chakra-ui/react";

export default function LogIn() {
  return (
    <VStack>
      <Heading>¡Bienvenido/a, regístrate!</Heading>
      <SignUpForm />
    </VStack>
  );
}
