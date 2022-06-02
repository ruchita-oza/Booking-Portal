export const selectUser = (state) => state.user;

export const selectLoggedInUser = (state) => selectUser(state).loggedInUser;

// export const selectUserToken = (state) => selectUser(state).token;
