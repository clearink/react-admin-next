import { valueRange } from "@/utils/Value";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FilterValue, TablePaginationConfig } from "antd/lib/table/interface";
import { defaultPagination, getCurrentAndSize, getFilters, getInitState, getSorter } from "./utils";

// 放置 reduce

const initialState = {
	pagination: defaultPagination,
	filters: {},
	sorter: {},
	total: defaultPagination.total,
	// 存放 选中列数据
	keys: [],
} as ReturnType<typeof getInitState>;
const slice = createSlice({
	name: "pro-table",
	initialState,
	reducers: {
		setPagination(state, action: PayloadAction<false | TablePaginationConfig | undefined>) {
			state.pagination = getCurrentAndSize(action.payload, state.pagination);
		},
		setFilters(state, action: PayloadAction<Record<string, FilterValue | null>>) {
			state.filters = getFilters(action.payload);
		},
		setSorter(state, action: PayloadAction<any | any[]>) {
			state.sorter = getSorter(action.payload);
		},

		setCurrent(state, action: PayloadAction<number>) {
			// 注意是否越界了
			const { pageSize } = state.pagination;
			const { total } = state;
			const max = Math.ceil(pageSize / total);
			state.pagination.current = valueRange(action.payload, 0, max);
		},

		setTotal(state, action: PayloadAction<number>) {
			state.total = action.payload;
		},

		setKeys(state, action: PayloadAction<React.Key[]>) {
			state.keys = action.payload;
		},
	},
});
export const actions = slice.actions;
export default slice.reducer;
