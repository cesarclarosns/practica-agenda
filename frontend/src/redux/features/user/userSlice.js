import { createSlice } from "@reduxjs/toolkit";

// userSlice
const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: {
      username: "",
      userId: "",
      token: "",
    },
    isAuthenticated: false,
  },
  reducers: {
    signInSuccess: (state, action) => {
      const {
        key,
        user: { username, id },
      } = action.payload;

      state.currentUser = {
        username: username,
        userId: id,
        token: "Token " + key,
      };
      state.isAuthenticated = true;
    },
    signOutSuccess: (state) => {
      state.currentUser = {
        username: "",
        userId: "",
        token: "",
      };
      state.isAuthenticated = false;
    },
  },
});

export const { signInSuccess, signOutSuccess } = userSlice.actions;

export default userSlice.reducer;
