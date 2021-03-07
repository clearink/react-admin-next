import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// layout 视图变化
/* 
目前有 
1. 固定 menu
2. 固定 menu

未来添加
1. app布局结构
2. 主题颜色
基本就是模仿antd pro
 */
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
