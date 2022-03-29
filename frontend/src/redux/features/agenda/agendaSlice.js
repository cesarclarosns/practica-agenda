import { createSlice } from "@reduxjs/toolkit";

const contactsSlice = createSlice({
  name: "agenda",
  initialState: {
    contacts: [],
  },
  reducers: {
    addContacts: (state, action) => {
      state.contacts = action.payload;
    },
    addContact: (state, action) => {
      state.contacts.push(action.payload);
    },
    removeContact: (state, action) => {
      state.contacts = state.contacts.filter(
        (contact) => contact.id !== action.payload.id
      );
    },
    removeContacts: (state) => {
      state.contacts = [];
    },
  },
});

export const { addContact, addContacts, removeContact } = contactsSlice.actions;

// Additional actions

export default contactsSlice.reducer;
