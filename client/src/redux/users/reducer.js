//import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from "./types";
import {
  RESET_IS_SIGNING,
  SET_IS_SIGNING,
  SET_LOGGEDIN_USER,
  SET_LOGGEDOUT_USER,
  REFRESH_STATE,
  USER_BOOKING_RECORD_REQUEST,
  USER_BOOKING_RECORD_SUCCESS,
  USER_BOOKING_RECORD_FAIL,
} from "./types";

const initialState = {
  loggedInUser: null,
  //   token: null,
  isLoading: false,
  error: "",
  isSigning: false,
  bookingRecords: [],
  //   reportedUsers: [],
  //   forgetEmail: "",
  //   search: "",
};

export const authReducer = (state = initialState, action) => {
  console.log(action.type);
  switch (action.type) {
    case SET_LOGGEDIN_USER:
      return {
        ...state,
        loggedInUser: action.payload.user,
        //   token: action.payload.token,
        error: "",
        isSigning: false,
      };
    case SET_LOGGEDOUT_USER:
      return {
        ...state,
        users: [],
        error: "",
        loggedInUser: null,
      };

    case SET_IS_SIGNING:
      return { ...state, isSigning: true };
    case RESET_IS_SIGNING:
      return {
        ...state,
        isSigning: false,
      };
    case REFRESH_STATE:
      return {
        ...state,
        loggedInUser: action.payload.user,
      };

    case USER_BOOKING_RECORD_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case USER_BOOKING_RECORD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        bookingRecords: action.payload,
        error: "",
      };

    case USER_BOOKING_RECORD_FAIL:
      return {
        ...state,
        isLoading: false,
        bookingRecords: [],
        error: action.payload,
      };
    // case CLEAR_ERR:
    //   return { ...state, error: null };
    default:
      return state;
  }
};
