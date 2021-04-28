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
		setLogin(state, action: PayloadAction<boolean>) {
			state.isLogin = action.payload;
		},
	},
	extraReducers: (builder) => {
		// builder.addCase()
	},
});

export const actions = slice.actions;
export default slice.reducer;
