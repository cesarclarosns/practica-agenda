import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";

import { selectCurrentUser } from "../redux/features/user/userSelectors";
import { signOutSuccess } from "../redux/features/user/userSlice";

import { HStack } from "@chakra-ui/react";

export default function Header(props) {
  const { isUserAuthenticated } = props;
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const token = currentUser.token;

  function logOut() {
    axios({
      url: "/api/v1/auth/logout/",
      method: "post",
      headers: {
        Authorization: token,
      },
    })
      .then((res) => {
        console.log(res.data);
        dispatch(signOutSuccess());
      })
      .catch((err) => console.log(err));
  }
  return (
    <HStack>
      {isUserAuthenticated ? (
        <Link to="" onClick={() => logOut()}>
          Cerrar sesión
        </Link>
      ) : (
        <>
          <Link to="/signin">Iniciar sesión</Link>
          <Link to="/signup">Regístrarse</Link>
        </>
      )}
    </HStack>
  );
}
