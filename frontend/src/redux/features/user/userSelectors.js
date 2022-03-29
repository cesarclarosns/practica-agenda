import { createSelector } from "@reduxjs/toolkit";

const selectUser = (state) => state.user;

// Selectors

export const selectCurrentUser = createSelector(
  [selectUser],
  (user) => user.currentUser
);

export const selectIsUserAuthenticated = createSelector(
  [selectUser],
  (user) => user.isAuthenticated
);
