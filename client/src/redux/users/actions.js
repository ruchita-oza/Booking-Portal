import {
  REFRESH_STATE,
  RESET_IS_SIGNING,
  SET_IS_SIGNING,
  SET_LOGGEDIN_USER,
  SET_LOGGEDOUT_USER,
  SET_USER_SEARCH,
} from "./types";
import { getLoggedInUserApi } from "../../services/UserService";
import toast from "react-hot-toast";

export const refreshState = ({ token, user }) => ({
  type: REFRESH_STATE,
  payload: { token, user },
});

export const setLoggedInUser = (user) => {
  return {
    type: SET_LOGGEDIN_USER,
    payload: user,
  };
};

export const setLoggedOutUser = () => {
  return {
    type: SET_LOGGEDOUT_USER,
  };
};

export const setUserSearch = (search) => {
  return {
    type: SET_USER_SEARCH,
    payload: search,
  };
};

export const setIsSigning = () => {
  return {
    type: SET_IS_SIGNING,
  };
};

export const resetIsSigning = () => {
  return {
    type: RESET_IS_SIGNING,
  };
};
export const fetchLoginUserThunkAction = (
  email,
  password,
  onSuccess,
  onError
) => {
  return async (dispatch) => {
    try {
      console.log("at login", email, password);
      dispatch(setIsSigning());
      const { data } = await getLoggedInUserApi({ email, password });
      console.log(data);
      if (data.success !== true) {
        throw new Error(data);
      }
      toast.success("Logged in successfully.");
      console.log("user data: " + data);
      localStorage.setItem("user", JSON.stringify(data));
      dispatch(
        setLoggedInUser({
          // token: data.data.token,
          user: data,
        })
      );
      onSuccess();
    } catch (error) {
      onError(error.response.data.message || error?.message);
      dispatch(resetIsSigning());
      toast.error(
        `ERROR ${error.response.data.status} : ${error.response.data.message}`
      );
    }
  };
};
export const loggingOutUserThunkAction = () => {
  return async (dispatch) => {
    try {
      dispatch(setLoggedOutUser());
      // localStorage.removeItem("token");
      localStorage.removeItem("user");
      toast.success("Logged out successfully.");
      // onSuccess();
    } catch (error) {}
  };
};
