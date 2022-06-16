import React from "react";
import { Navigate, Outlet } from "react-router-dom";

import { useSelector } from "react-redux";
import { selectUser } from "../../redux/users/selectors";
import toast from "react-hot-toast";
function AdminPrivateRoute() {
  const { loggedInUser } = useSelector(selectUser);
//   console.log(loggedInUser?.is_admin);
  return loggedInUser ? loggedInUser.is_admin ==="Admin" ?<>
   <Outlet /></> : <>{toast.error("You Are Not Authorized To View This")}<Navigate to="/auth/login" /></> 
   :<>{toast.error("Please Login First With Admin Credential")}<Navigate to="/auth/login" /></>;
}

export default AdminPrivateRoute;
