import LoginUtil from "@/utils/LoginUtil";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserInfoProps {
  [key: string]: any;
}
const initialState = {
  isLogin: LoginUtil.isLogin(),
  userInfo: null as null | UserInfoProps,
  loginLoading: false,
};
const slice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    clearUser(state) {
      state.userInfo = null;
    },
  },
  extraReducers: (builder) => {
    // builder.addCase()
  },
});

export const actions = slice.actions;
export default slice.reducer;
