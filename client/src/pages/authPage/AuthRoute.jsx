import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/users/selectors";

let user = JSON.parse(localStorage.getItem("user")) || null;

function AuthRoute() {
  const { loggedInUser } = useSelector(selectUser);
  React.useEffect(() => {
    user = JSON.parse(localStorage.getItem("user")) || null;
  }, []);
  return !user ? (
    <Outlet />
  ) : user.is_admin === "Admin" ? (
    <Navigate to="/admin/dashboard" />
  ) : (
    <Navigate to="/" />
  );
}

export default AuthRoute;
