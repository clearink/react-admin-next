import { isNullUndefined, isUndefined } from "@/utils/ValidateType";
import { FilterValue, SorterResult, TablePaginationConfig } from "antd/lib/table/interface";

// 获得 table 的 过滤字段
export function getFilters(filters: Record<string, FilterValue | null>) {
	return Object.entries(filters).reduce((pre, [k, v]) => {
		if (isNullUndefined(v)) return pre;
		return { ...pre, [k]: v };
	}, {} as Record<string, FilterValue>);
}

// 获取 table 的 排序字段
export function getSorter<T = SorterResult<any>>(sorter: T | T[]) {
	return ([] as Record<string, any>[]).concat(sorter).reduce((pre, cur) => {
		if (isUndefined(cur.field) || isNullUndefined(cur.order)) return pre;
		return { ...pre, [cur.field as string]: cur.order };
	}, {}) as Record<string, "descend" | "ascend">;
}

// 同步 table 的 分页数据
export function getCurrentAndSize(
	pagination?: TablePaginationConfig | false,
	defaultValue: Record<"current" | "pageSize", number> = { current: 1, pageSize: 10 }
) {
	if (!pagination) return defaultValue;
	return {
		current: pagination.current ?? defaultValue.current,
		pageSize: pagination.pageSize ?? defaultValue.pageSize,
	};
}
