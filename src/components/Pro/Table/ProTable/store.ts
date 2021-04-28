import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FilterValue, TablePaginationConfig } from "antd/lib/table/interface";
import { Draft, WritableDraft } from "immer/dist/internal";
import { ProTableState } from "./interface";
import { getCurrentAndSize, getFilters, getSorter } from "./utils";

// 放置 reduce

const initialState = {
	params: {},
	pagination: { current: 1, pageSize: 10 },
	filters: {},
	sorter: {},
};
const slice = createSlice({
	name: "pro-table",
	initialState,
	reducers: {
		setParams(state, action: PayloadAction<Record<string, any>>) {
			state.params = action.payload;
		},
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
