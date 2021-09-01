import { cloneElement, isValidElement, MutableRefObject, useCallback, useMemo } from "react";
import { Typography } from "antd";
import { ColumnsType } from "antd/lib/table";
import merge from "lodash/merge";
import TitleTip from "@/components/Pro/TitleTip";
import { isObject } from "@/utils/ValidateType";
import { FilterValue as PickValue } from "@/utils/Value";
import { EditableColumnsType, EditableColumnType, EditableTableRef, EditType } from "../interface";

// 转换 columns 分离出 editCol 与 tableCol
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
	const appendEditCol = useCallback((array: JSX.Element[], item: EditableColumnType<T>) => {
		const { hideInForm, title, dataIndex, props: $props, edit } = item;
		if (hideInForm || !isValidElement(edit)) return;

		// TODO: 处理 ProGroupColumn
		const props = merge(
			{ label: title, name: dataIndex, key: dataIndex },
			{ field: $props },
			edit.props
		);
		array.push(cloneElement(edit, props));
	}, []);

	// 重写 columns.render 属性
	const overrideRender = useCallback(
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
	// 追加 table column
	const appendColumn = useCallback(
		(array: ColumnsType<T>, item: EditableColumnType<T>) => {
			const { edit, dataIndex, props: $props } = item;
			const props = PickValue(item, columnFilterProperty);
			const columnItem = { ...props, render: overrideRender(item) };
			if (editType === "cell" && isValidElement(edit)) {
				const editElement = cloneElement(
					item.edit!,
					merge({ name: dataIndex }, { field: $props }, edit.props)
				);
				const handleCell = (record: T) => ({
					record,
					dataIndex,
					edit: editElement,
					title: undefined,
					handleSave: () => {},
				});
				Object.assign(columnItem, { onCell: handleCell });
			}
			array.push(columnItem);
		},
		[overrideRender, editType]
	);

	return useMemo(() => {
		const tableCol: ColumnsType<T> = [];
		const editCol: JSX.Element[] = [];
		for (let i = 0; i < columns.length; i++) {
			const item = columns[i] as EditableColumnType<T>;
			// TODO: 处理 group
			const { hideInTable, title: $title } = item;
			const title = getTitle($title);
			appendEditCol(editCol, { ...item, title }); // 追加表单项

			if (hideInTable) continue;

			appendColumn(tableCol, { ...item, title }); // 追加 column 项
		}
		return [tableCol, editCol] as const;
	}, [appendEditCol, appendColumn, columns, getTitle]);
}
