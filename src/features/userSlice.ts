import { createSlice } from "@reduxjs/toolkit";
import { User } from "../dto/user";
import { usersApi } from "../services/usersApi";

const initialState: User = {
  id: null,
  email: "",
  image: "",
  name: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addNotifications: (state, { payload }) => {
      //   if (state.newMessages[payload]) {
      //     state.newMessages[payload] = state.newMessages[payload] + 1;
      // } else {
      //     state.newMessages[payload] = 1;
      // }
    },
    resetNotifications: (state, { payload }) => {
      // delete state.newMessages[payload];
    },
    clearUserData: () => initialState,
  },
  extraReducers: (builder) => {
    //save user after signup
    builder.addMatcher(
      usersApi.endpoints.signupUser.matchFulfilled,
      (state, { payload }) => payload
    );
    //save user after login
    builder.addMatcher(
      usersApi.endpoints.loginUser.matchFulfilled,
      (state, { payload }) => payload
    );
    //logout
    builder.addMatcher(usersApi.endpoints.logoutUser.matchFulfilled, () => {});
  },
});

export const {
  addNotifications,
  resetNotifications,
  clearUserData,
} = userSlice.actions;

// export const selectCurrentUser = (state: RootState) => state.auth.user;
