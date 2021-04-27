import { MenuItemProps } from "@/@types/menu";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  menu: [] as MenuItemProps[],
  collapsed: false,
};
const slice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    toggle(state) {
      state.collapsed = !state.collapsed;
    },
    setMenu(state, action: PayloadAction<MenuItemProps[]>) {
      state.menu = action.payload;
    },
    setCollapsed(state, action: PayloadAction<boolean>) {
      state.collapsed = action.payload;
    },
  },
});

export const actions = slice.actions;
export default slice.reducer;
