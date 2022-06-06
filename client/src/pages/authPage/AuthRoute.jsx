import React from "react";
import { Navigate, Outlet } from "react-router-dom";

import { useSelector } from "react-redux";
import { selectUser } from "../../redux/users/selectors";

function AuthRoute() {
  const { loggedInUser } = useSelector(selectUser);

  return !loggedInUser ? <Outlet /> : <Navigate to="/" />;
}

export default AuthRoute;
