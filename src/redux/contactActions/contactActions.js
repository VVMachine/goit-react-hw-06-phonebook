import { createAction } from "@reduxjs/toolkit";

// import {
//   ADD_CONTACT,
//   REMOVE_CONTACT,
//   FILTER_CONTACT,
// } from "../contactTypes/contactTypes";

import { v4 as uuidv4 } from "uuid";

const add = createAction("contact/add", (name, number) => ({
  payload: {
    name,
    number,
    id: uuidv4(),
  },
}));


const remove = createAction('contact/remove');
const filter = createAction('contact/filter');

const getFromLS = createAction('contact/getFromLS');


// const add = (name, number) => {
//   return {
//     type: ADD_CONTACT,
//     payload: {
//       name,
//       number,
//       id: uuidv4(),
//     },
//   };
// };

// const remove = (id) => {
//   return {
//     type: REMOVE_CONTACT,
//     payload: {
//       id,
//     },
//   };
// };

// const filter = (name) => {
//   return {
//     type: FILTER_CONTACT,
//     payload: name,
//   };
// };

export default {
  add,
  remove,
  filter,
  getFromLS,
};
