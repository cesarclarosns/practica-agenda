import { createSelector } from "@reduxjs/toolkit";

const selectAgenda = (state) => state.agenda;

// Selectors

export const selectContacts = createSelector(
  [selectAgenda],
  (agenda) => agenda.contacts
);
