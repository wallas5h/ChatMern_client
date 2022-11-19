import { createSlice } from "@reduxjs/toolkit";
import { User } from "../dto/user";
import { usersApi } from "../services/usersApi";

export interface UserState {
  user?: User;
}

export const userSlice = createSlice({
  name: "user",
  initialState: {} as UserState,
  reducers: {
    addNotifications: (state, { payload }) => {},
    resetNotifications: (state, { payload }) => {},
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

export const { addNotifications, resetNotifications } = userSlice.actions;

// export const selectCurrentUser = (state: RootState) => state.auth.user;
