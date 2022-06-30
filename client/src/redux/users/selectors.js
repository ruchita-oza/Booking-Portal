export const selectUser = (state) => state.user;

export const selectLoggedInUser = (state) => selectUser(state).loggedInUser;

export const selectPassenger = (state) => state.passenger;
