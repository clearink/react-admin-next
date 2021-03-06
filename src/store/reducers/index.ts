import { combineReducers } from "@reduxjs/toolkit";
import menu from "./menu";
import user from "./user";
const rootReducer = combineReducers({
  menu,
  user,
});

export default rootReducer;
