import { Tooltip } from "antd";
import { ColumnsType, ColumnType } from "antd/lib/table";
import { FilterValue, SorterResult } from "antd/lib/table/interface";
import React, { cloneElement, isValidElement } from "react";
import TableText from "../components/TableText";
import { ProColumnsType, ProColumnType } from "../interface";

// TODO: 将 filters default 与 value 分离开
export default function useFilterTableColumn<T extends object = any>(
	columns: ProColumnsType<T> = []
) {
	const tableCol: ColumnsType<T> = [];
	const formCol: JSX.Element[] = [];
	const filters: Record<string, FilterValue | null> = {};
	const sorter: SorterResult<T> | SorterResult<T>[] = {};
	for (let i = 0; i < columns.length; i++) {
		const item = columns[i] as ProColumnType<T>;

		const { search, read, render, hideInForm, hideInTable, label, props: $props, ...rest } = item;
		if (search && !hideInForm && isValidElement(search)) {
			// TODO: 处理 ProGroupColumn
			const props = {
				label: label ?? item.title,
				name: item["dataIndex"],
				key: item["dataIndex"]?.toString() ?? i,
				...$props,
				...(search.props as any),
			};
			formCol.push(cloneElement(search, props));
		}
		if (hideInTable) continue;

		if (item.dataIndex) {
			const name = ([] as React.Key[]).concat(item.dataIndex).join(".");
			// 目前仅仅支持 默认值 不支持 外部受控
			if (item.hasOwnProperty("defaultFilteredValue")) filters[name] = item.defaultFilteredValue!;
			if (item.hasOwnProperty("defaultSortOrder")) sorter[name] = item.defaultSortOrder;
		}
		const readElement = read ?? <TableText />;
		const colItem: ColumnType<T> = {
			...rest,
			render: (value, record, index) => {
				let dom = cloneElement(readElement, { text: value });
				// 如果使用省略 默认包裹一层 tooltip
				if (dom.props.ellipsis) {
					dom = <Tooltip title={value}>{dom}</Tooltip>;
				}
				if (render) return render(dom, value, record, index);
				return dom;
			},
		};
		tableCol.push(colItem);
	}
	return [tableCol, formCol, filters, sorter] as const;
}
