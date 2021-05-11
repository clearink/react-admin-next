import TitleTip from "@/components/Pro/TitleTip";
import { isObject, isUndefined } from "@/utils/ValidateType";
import { Tooltip } from "antd";
import { ColumnsType, ColumnType } from "antd/lib/table";
import { FilterValue, SorterResult } from "antd/lib/table/interface";
import React, { cloneElement, isValidElement, RefObject } from "react";
import TableText from "../../components/TableText";
import { ProColumnsType, ProColumnType, ProTableRef } from "../interface";

export default function useFormatColumn<T extends object = any>(
	columns: ProColumnsType<T> = [],
	action: RefObject<ProTableRef<T> | undefined>
) {
	const tableCol: ColumnsType<T> = [];
	const formCol: JSX.Element[] = [];
	const filters: Record<string, FilterValue | null> = {};
	const sorter: SorterResult<T> | SorterResult<T>[] = {};
	for (let i = 0; i < columns.length; i++) {
		const item = columns[i] as ProColumnType<T>;

		const { search, read, render, hideInForm, hideInTable, props: $props, ...rest } = item;
		const { dataIndex, title: $title } = item;
		const title = (() => {
			if (isValidElement($title)) return $title;
			if (isObject($title)) return <TitleTip title={$title} />;
			return $title;
		})();
		if (!hideInForm && isValidElement(search)) {
			// TODO: 处理 ProGroupColumn
			const props = {
				label: title,
				name: dataIndex,
				key: dataIndex ?? i,
				...(search.props as any),
				field: {
					...$props,
					...(search.props as any).field,
				},
			};
			// TODO: formCol 排序
			formCol.push(cloneElement(search, props));
		}
		if (hideInTable) continue;

		if (dataIndex) {
			const name = ([] as React.Key[]).concat(dataIndex).join(".");
			// 目前仅仅支持 默认值 不支持 外部受控
			if (!isUndefined(item.defaultFilteredValue)) filters[name] = item.defaultFilteredValue!;
			if (!isUndefined(item.defaultSortOrder)) sorter[name] = item.defaultSortOrder;
		}
		const readElement = read ?? <TableText />;
		const colItem: ColumnType<T> = {
			...rest,
			title,
			render: (value, record, index) => {
				let dom = cloneElement(readElement, {...$props, text: value });
				// 如果使用省略 默认包裹一层 tooltip
				if (dom.props.ellipsis) {
					dom = <Tooltip title={value}>{dom}</Tooltip>;
				}
				if (render) return render(dom, record, index, action.current!);
				return dom;
			},
		};
		// TODO: tableCol 排序
		tableCol.push(colItem);
	}
	return [tableCol, formCol, filters, sorter] as const;
}
