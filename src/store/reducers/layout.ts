import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// layout 视图变化
const initialState = {
  header_fixed: true,
  menu_fixed: true,
};
const slice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    setHeaderFixed(state, action: PayloadAction<boolean>) {
      state.header_fixed = action.payload;
    },
    setMenuFixed(state, action: PayloadAction<boolean>) {
      state.menu_fixed = action.payload;
    },
  },
});

export const actions = slice.actions;
export default slice.reducer;
