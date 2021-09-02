import React, { cloneElement, isValidElement, RefObject, useCallback, useMemo } from "react";
import { Typography } from "antd";
import merge from "lodash/merge";
import { ColumnType, FilterValue, SorterResult } from "antd/lib/table/interface";
import TitleTip from "@/components/Pro/TitleTip";
import { isObject, isUndefined } from "@/utils/ValidateType";
import { ProColumnsType, ProColumnType, ProTableRef } from "../interface";
import { FilterValue as PickValue } from "@/utils/Value";

const columnFilterProperty = [
	"search",
	"read",
	"hideInSearch",
	"hideInTable",
	"props",
	"copyable",
	"searchSort",
	"tableSort",
	"ellipsis",
	"formSort",
	"tableSort",
] as any;
export default function useFormatColumn<T extends object = any>(
	columns: ProColumnsType<T> = [],
	action: RefObject<ProTableRef<T> | undefined>
) {
	// 获得 title
	const getTitle = useCallback((title: ProColumnType<T>["title"]) => {
		if (isValidElement(title)) return title;
		if (isObject(title)) return <TitleTip title={title} />;
		return title;
	}, []);

	// 追加筛选表单项
	const appendFormCol = useCallback(
		(array: [JSX.Element, number][], item: ProColumnType<T>, index: number) => {
			const { hideInForm, title, dataIndex, props: $props, search } = item;
			if (hideInForm || !isValidElement(search)) return;

			// TODO: 处理 ProGroupColumn
			const props = merge(
				{ label: title, name: dataIndex, key: dataIndex ?? index },
				{ field: $props },
				search.props
			);
			array.push([cloneElement(search, props), item.formSort ?? index]);
		},
		[]
	);

	// 重写 columns.render 属性
	const columnRender = useCallback(
		(item: ProColumnType<T>) => {
			const { props, ellipsis, copyable, render, read } = item;
			return (value: any, record: T, index: number) => {
				const dom = (
					<Typography.Text
						className='w-full m-0 p-0'
						ellipsis={ellipsis ? { tooltip: value } : false}
						copyable={copyable ? { tooltips: false } : false}
					>
						{read ? cloneElement(read, { text: value, ...props, ...read.props }) : value}
					</Typography.Text>
				);
				if (render) return render(dom, record, index, action.current!);
				return dom;
			};
		},
		[action]
	);

	// 追加 table column
	const appendColumn = useCallback(
		(array: [ColumnType<T>, number][], item: ProColumnType<T>, index: number) => {
			const props = PickValue(item, columnFilterProperty);
			array.push([{ ...props, render: columnRender(item) }, item.tableSort ?? index]);
		},
		[columnRender]
	);

	return useMemo(() => {
		const tableCol: [ColumnType<T>, number][] = [];
		const formCol: [JSX.Element, number][] = [];
		const filters: Record<string, FilterValue | null> = {};
		const sorter: SorterResult<T> | SorterResult<T>[] = {};
		for (let index = 0; index < columns.length; index++) {
			const item = columns[index] as ProColumnType<T>;

			const { hideInTable, dataIndex, title: $title } = item;
			const title = getTitle($title);
			appendFormCol(formCol, { ...item, title }, index); // 追加表单项
			if (hideInTable) continue;

			// TODO: 外部控制 筛选
			if (dataIndex) {
				const name = ([] as React.Key[]).concat(dataIndex).join(".");
				// 目前仅仅支持 默认值 不支持 外部受控
				if (!isUndefined(item.defaultFilteredValue)) filters[name] = item.defaultFilteredValue!;
				if (!isUndefined(item.defaultSortOrder)) sorter[name] = item.defaultSortOrder;
			}

			appendColumn(tableCol, { ...item, title }, index); // 追加 column 项
		}
		const tableColumns = tableCol.sort((a, b) => a[1] - b[1]).map((item) => item[0]);
		const formColumns = formCol.sort((a, b) => a[1] - b[1]).map((item) => item[0]);
		return [tableColumns, formColumns, filters, sorter] as const;
	}, [appendFormCol, appendColumn, columns, getTitle]);
}
