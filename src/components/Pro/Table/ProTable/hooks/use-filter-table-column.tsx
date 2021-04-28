import { FieldText } from "@/components/Pro/Field";
import { Tooltip } from "antd";
import { ColumnsType, ColumnType } from "antd/lib/table";
import { FilterValue, SorterResult, SortOrder } from "antd/lib/table/interface";
import React, { cloneElement, isValidElement } from "react";
import { ProColumnsType, ProColumnType } from "../interface";

// 是否需要 filteredValue 与 sortOrder 呢?
export default function useFilterTableColumn<T extends object = any>(
	columns: ProColumnsType<T> = []
) {
	const tableCol: ColumnsType<T> = [];
	const formCol: JSX.Element[] = [];
	const filters: Record<string, FilterValue | null | undefined> = {};
	const sorter: SorterResult<T> | SorterResult<T>[] = {};
	for (let i = 0; i < columns.length; i++) {
		const item = columns[i] as ProColumnType<T>;

		const { search, read, render, hideInForm, hideInTable, label, props: _props, ...rest } = item;
		if (search && !hideInForm && isValidElement(search)) {
			// TODO: 处理 ProGroupColumn
			const props = {
				label: label ?? item.title,
				name: item["dataIndex"],
				key: item["dataIndex"] as React.Key,
				..._props,
				...(search.props as any),
			};
			formCol.push(cloneElement(search, props));
		}
		if (!hideInTable) {
			if (item.dataIndex) {
				const name = ([] as React.Key[]).concat(item.dataIndex).join(".");
				filters[name] = item.hasOwnProperty("filteredValue")
					? item.filteredValue
					: item.defaultFilteredValue;
				sorter[name] = item.hasOwnProperty("sortOrder") ? item.sortOrder : item.defaultSortOrder;
			}
			const readElement = read ?? <FieldText />;
			const colItem: ColumnType<T> = {
				...rest,
				render: (value, record, index) => {
					let dom = cloneElement(readElement, { text: value });
					// 如果使用省略 默认包裹一层 tooltip
					if (dom.props.ellipsis) {
						dom = <Tooltip title={value}>{dom}</Tooltip>;
						/* TODO: 待测试
                        {cloneElement(dom, {
                                style: { width: rest.width },
                            })} */
					}
					if (render) return render(<></>, value, record, index);
					return dom;
				},
			};
			tableCol.push(colItem);
		}
	}
	return [tableCol, formCol, filters, sorter] as const;
}
