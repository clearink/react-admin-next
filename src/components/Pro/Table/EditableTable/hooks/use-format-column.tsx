import { cloneElement, isValidElement, MutableRefObject, useCallback, useMemo } from "react";
import { Typography } from "antd";
import { ColumnType } from "antd/lib/table";
import merge from "lodash/merge";
import TitleTip from "@/components/Pro/TitleTip";
import { isObject } from "@/utils/ValidateType";
import { FilterValue as PickValue } from "@/utils/Value";
import { EditableColumnsType, EditableColumnType, EditableTableRef, EditType } from "../interface";

// 转换 columns 分离出 formCol 与 tableCol
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
] as any;
export default function useFormatColumn<T extends object = any>(
	columns: EditableColumnsType<T> = [],
	actions: MutableRefObject<EditableTableRef<T> | undefined>,
	editType: EditType = "modal" // 编辑模式 默认 弹窗
) {
	// 获得 title
	const getTitle = useCallback((title: EditableColumnType<T>["title"]) => {
		if (isValidElement(title)) return title;
		if (isObject(title)) return <TitleTip title={title} />;
		return title;
	}, []);

	// 追加筛选表单项
	const appendFormCol = useCallback(
		(array: [JSX.Element, number][], item: EditableColumnType<T>, index: number) => {
			const { hideInForm, title, dataIndex, props: $props, edit } = item;
			if (hideInForm || !isValidElement(edit)) return;

			// TODO: 处理 ProGroupColumn
			const props = merge(
				{ label: title, name: dataIndex, key: dataIndex ?? index },
				{ field: $props },
				edit.props
			);
			array.push([cloneElement(edit, props), item.formSort ?? index]);
		},
		[]
	);

	// 重写 columns.render 属性
	const columnRender = useCallback(
		(item: EditableColumnType<T>) => {
			const { props, ellipsis, copyable, render, read } = item;
			return (value: any, record: T, index: number) => {
				const dom = (
					<Typography.Text
						className='w-full m-0 p-0'
						ellipsis={ellipsis ? { tooltip: value } : false}
						copyable={copyable ? { tooltips: false } : false}
					>
						{read ? cloneElement(read, { text: value, ...props, ...read.props }) : value ?? "-"}
					</Typography.Text>
				);
				if (render) return render(dom, record, index, actions.current!);
				return dom;
			};
		},
		[actions]
	);

	// 根据 editType 判断是否需要cell函数
	const handleCellEvent = useCallback<any>(
		(item: EditableColumnType<T>) => {
			const { edit, dataIndex, props: $props } = item;
			if (editType !== "cell" || !isValidElement(edit)) return;
			const editElement = cloneElement(
				item.edit!,
				merge({ name: dataIndex }, { field: $props }, edit.props)
			);
			return (record: T) => ({
				record,
				actions,
				dataIndex,
				edit: editElement,
			});
		},
		[actions, editType]
	);
	// 追加 table column
	const appendColumn = useCallback(
		(array: [ColumnType<T>, number][], item: EditableColumnType<T>, index: number) => {
			const props = PickValue(item, columnFilterProperty);
			const columnItem = { ...props, render: columnRender(item), onCell: handleCellEvent(item) };
			array.push([columnItem, item.tableSort ?? index]);
		},
		[columnRender, handleCellEvent]
	);

	return useMemo(() => {
		const tableCol: [ColumnType<T>, number][] = [];
		const formCol: [JSX.Element, number][] = [];
		for (let i = 0; i < columns.length; i++) {
			const item = columns[i] as EditableColumnType<T>;
			// TODO: 处理 group
			const { hideInTable, title: $title } = item;
			const title = getTitle($title);
			appendFormCol(formCol, { ...item, title }, i); // 追加表单项

			if (hideInTable) continue;

			appendColumn(tableCol, { ...item, title }, i); // 追加 column 项
		}
		const tableColumns = tableCol.sort((a, b) => a[1] - b[1]).map((item) => item[0]);
		const formColumns = formCol.sort((a, b) => a[1] - b[1]).map((item) => item[0]);
		return [tableColumns, formColumns] as const;
	}, [appendFormCol, appendColumn, columns, getTitle]);
}
