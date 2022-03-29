import React from "react";
import SignInForm from "../components/Forms/SignInForm";

import { Heading, VStack } from "@chakra-ui/react";

export default function SignIn() {
  return (
    <VStack>
      <Heading>¡Bienvenido/a, inicia sesión!</Heading>
      <SignInForm />
    </VStack>
  );
}
