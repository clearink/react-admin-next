import { isBoolean, isNullUndefined, isUndefined } from "@/utils/ValidateType";
import { SpinProps } from "antd";
import { FilterValue, SorterResult, TablePaginationConfig } from "antd/lib/table/interface";
import { createContext } from "react";
import { GetInitStateProps, ProTableRef } from "./interface";

// 获得 table 的 过滤字段
export function getFilters(filters: Record<string, FilterValue | null | undefined>) {
	return Object.entries(filters).reduce((pre, [k, v]) => {
		if (isNullUndefined(v)) return pre;
		return { ...pre, [k]: v };
	}, {} as Record<string, FilterValue>);
}

// 获取 table 的 排序字段
export function getSorter<T = SorterResult<any>>(sorter: T | T[]) {
	return ([] as Record<string, any>[]).concat(sorter).reduce((pre, cur) => {
		if (isUndefined(cur.field) || isNullUndefined(cur.order)) return pre;
		const name = [].concat(cur.field).join(".");
		return { ...pre, [name]: cur.order };
	}, {}) as Record<string, "descend" | "ascend">;
}

// 同步 table 的 分页数据
export const defaultPagination = { current: 1, pageSize: 10, total: 0 };
export function getCurrentAndSize(
	pagination: undefined | TablePaginationConfig | false,
	defaultValue: Record<"current" | "pageSize", number>
) {
	if (!pagination) return defaultValue;
	return {
		current: pagination.current ?? defaultValue.current,
		pageSize: pagination.pageSize ?? defaultValue.pageSize,
	};
}

// 初始化 分页 因为可能会有defaultValue 的干扰
export function getInitPagination(
	pagination: TablePaginationConfig | false | undefined,
	defaultValue: Record<"current" | "pageSize", number> = defaultPagination
) {
	if (!pagination) return defaultValue;
	return {
		current: pagination.defaultCurrent ?? defaultValue.current,
		pageSize: pagination.defaultPageSize ?? defaultValue.pageSize,
	};
}

// 初始总数
export function getInitTotal(
	pagination: TablePaginationConfig | false | undefined,
	defaultValue: Record<"current" | "pageSize" | "total", number> = defaultPagination
) {
	if (!pagination) return defaultValue.total;
	return pagination.total ?? defaultValue.total;
}

// 初始化 reducer 的值
export function getInitState(props: GetInitStateProps) {
	return {
		keys: [] as React.Key[],
		pagination: getInitPagination(props.pagination), // 分页
		filters: getFilters(props.filters), // 过滤
		sorter: getSorter(props.sorter), // 排序
		total: getInitTotal(props.pagination), // 总数
	};
}

//将table loading 处理成 button loading
export function getButtonLoading(tableLoading?: boolean | SpinProps) {
	if (isBoolean(tableLoading)) return tableLoading;
	if (tableLoading?.spinning !== false) {
		return { delay: tableLoading?.delay };
	}
	return false;
}

// Context 数据共享
export const ProTableContext = createContext<ProTableRef<any> | null>(null);
