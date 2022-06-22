import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useSelector } from "react-redux";
import { selectUser } from "../../redux/users/selectors";
import toast from "react-hot-toast";
import UnAuthorized from "../../pages/errorPage/UnAuthorized";

function AdminPrivateRoute({ redirect = false }) {
  const { loggedInUser } = useSelector(selectUser);
  let user = loggedInUser
    ? loggedInUser
    : JSON.parse(localStorage.getItem("user")) || null;

  React.useEffect(() => {
    user = JSON.parse(localStorage.getItem("user")) || null;
    console.log(redirect);
  }, []);
  return user ? (
    user.is_admin === "Admin" ? (
      <>
        <Outlet />
      </>
    ) : (
      <>
        <UnAuthorized />
      </>
    )
  ) : (
    <>
      <Navigate to="/auth/login" />
    </>
  );
}

export default AdminPrivateRoute;
