import React from "react";
import { useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import { selectIsUserAuthenticated } from "./redux/features/user/userSelectors";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme";

import Header from "./components/Header";

import HomePage from "./pages/HomePage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";

function App() {
  const isUserAuthenticated = useSelector(selectIsUserAuthenticated);

  return (
    <ChakraProvider theme={theme}>
      <Header isUserAuthenticated={isUserAuthenticated} />
      <Routes>
        <Route
          path="/"
          element={
            isUserAuthenticated ? <HomePage /> : <Navigate to="/signin" />
          }
        />
        <Route
          path="signin"
          element={!isUserAuthenticated ? <SignInPage /> : <Navigate to="/" />}
        ></Route>
        <Route
          path="signup"
          element={!isUserAuthenticated ? <SignUpPage /> : <Navigate to="/" />}
        ></Route>
      </Routes>
    </ChakraProvider>
  );
}

export default App;
