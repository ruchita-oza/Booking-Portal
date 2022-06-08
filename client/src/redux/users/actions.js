import {
  REFRESH_STATE,
  RESET_IS_SIGNING,
  SET_IS_SIGNING,
  SET_LOGGEDIN_USER,
  SET_LOGGEDOUT_USER,
  SET_USER_SEARCH,
  // USER_DETAIL_REQUEST,
  // USER_DETAIL_SUCCESS,
  // USER_DETAIL_FAIL,
  USER_BOOKING_RECORD_REQUEST,
  USER_BOOKING_RECORD_SUCCESS,
  USER_BOOKING_RECORD_FAIL,
} from "./types";

import {
  getLoggedInUserApi,
  // getUserDetailApi,
  getUserBookingRecordsDetailApi,
} from "../../services/UserService";

import toast from "react-hot-toast";
// import { dispatch } from "react-hot-toast/dist/core/store";

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

export const fetchUserBookingRecordRequest = () => {
  return {
    type: USER_BOOKING_RECORD_REQUEST,
  };
};

export const fetchUserBookingRecordSuccess = (data) => {
  return {
    type: USER_BOOKING_RECORD_SUCCESS,
    payload: data,
  };
};

export const fetchUserBookingRecordFail = () => {
  return {
    type: USER_BOOKING_RECORD_FAIL,
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

export const fetchUserBookingRecordsDetailThunkAction = (
  id,
  onError,
  onSuccess
) => {
  return async (dispatch) => {
    try {
      // console.log("data id: " + id);
      dispatch(fetchUserBookingRecordRequest());
      const { data } = await getUserBookingRecordsDetailApi(id);
      if (data) {
        // console.log(data);
        dispatch(fetchUserBookingRecordSuccess(data));
      }
    } catch (error) {
      // console.log("errrorrrr: " + error);
      onError(error.response.data.message || error?.message);
      dispatch(fetchUserBookingRecordFail(error));
      toast.error(
        `ERROR ${error.response.data.status} : ${error.response.data.message}`
      );
    }
  };
};

// export const fetchUserDetailThunkAction = (user_id) => {
//   return async (dispatch) => {
//     try {
//       // console.log("at login", email, password);
//       dispatch(userDetailRequest());
//       const { data } = await getUserDetailApi({ id:user_id });
//       console.log(data);
//       if (!data) {
//         throw new Error(data);
//       }
//       toast.success("Logged in successfully.");
//       console.log("user data: " + data);
//       localStorage.setItem("user", JSON.stringify(data));
//       dispatch(
//         setLoggedInUser({
//           // token: data.data.token,
//           user: data,
//         })
//       );
//       onSuccess();
//     } catch (error) {
//       onError(error.response.data.message || error?.message);
//       dispatch(resetIsSigning());
//       toast.error(
//         `ERROR ${error.response.data.status} : ${error.response.data.message}`
//       );
//     }
//   };
// };

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
