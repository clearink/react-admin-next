import { combineReducers } from "@reduxjs/toolkit";
import menu from "./menu";
import user from "./user";
import layout from "./layout";
const rootReducer = combineReducers({
  menu,
  user,
  layout,
});

export default rootReducer;
