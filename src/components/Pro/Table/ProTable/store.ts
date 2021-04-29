import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FilterValue, TablePaginationConfig } from "antd/lib/table/interface";
import { getCurrentAndSize, getFilters, getInitState, getSorter } from "./utils";

// 放置 reduce

const initialState = {
	// params:{} 因为无法获得表单的默认值 所以不是存储表单的值 而是在 handleRequest函数中去获取
	pagination: { current: 1, pageSize: 10 },
	filters: {},
	sorter: {},
} as ReturnType<typeof getInitState>;
const slice = createSlice({
	name: "pro-table",
	initialState,
	reducers: {
		setPagination(state, action: PayloadAction<false | TablePaginationConfig | undefined>) {
			state.pagination = getCurrentAndSize(action.payload);
		},
		setFilters(state, action: PayloadAction<Record<string, FilterValue | null>>) {
			state.filters = getFilters(action.payload);
		},
		setSorter(state, action: PayloadAction<any | any[]>) {
			state.sorter = getSorter(action.payload);
		},
	},
});
export const actions = slice.actions;
export default slice.reducer;
