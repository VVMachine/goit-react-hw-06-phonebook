import { combineReducers } from "redux";
// import {
//   ADD_CONTACT,
//   REMOVE_CONTACT,
//   FILTER_CONTACT,
// } from "../contactTypes/contactTypes";

import { createReducer } from "@reduxjs/toolkit";
import contactActions from "../contactActions/contactActions";

const addContact = (state, action) => {
  const contactsFromLS = localStorage.getItem("contacts");
  const newContact = action.payload;

  if (!contactsFromLS) {
    localStorage.setItem("contacts", JSON.stringify([newContact]));
  } else {
    const parsedContacts = JSON.parse(contactsFromLS);
    localStorage.setItem(
      "contacts",
      JSON.stringify([newContact, ...parsedContacts])
    );
  }

  return [action.payload, ...state];
};

const getFromLS = (state, action) => action.payload;

const removeContact = (state, action) => {
  const contactsFromLS = localStorage.getItem("contacts");
  const parsedContacts = JSON.parse(contactsFromLS);

  const newContactsIntoLS = parsedContacts.filter(
    (contact) => contact.id !== action.payload
  );

  localStorage.setItem("contacts", JSON.stringify(newContactsIntoLS));

  return state.filter((contact) => contact.id !== action.payload);
};

const itemReducer = createReducer([], {
  [contactActions.add]: addContact,
  [contactActions.remove]: removeContact,
  [contactActions.getFromLS]: getFromLS,
});

const filterContacts = (state, action) => action.payload;

const filterReducer = createReducer("", {
  [contactActions.filter]: filterContacts,
});

// const itemReducer = (state = [], action) => {
//   switch (action.type) {
//     case ADD_CONTACT:
//       return [action.payload, ...state];

//     case REMOVE_CONTACT:
//       return state.filter((contact) => contact.id !== action.payload.id);

//     default:
//       return state;
//   }
// };

// const filterReducer = (state = "", action) => {
//   switch (action.type) {
//     case FILTER_CONTACT:
//       return action.payload;

//     default:
//       return state;
//   }
// };

export default combineReducers({
  items: itemReducer,
  filter: filterReducer,
});