import { forwardRef, Ref, useEffect, useImperativeHandle, useMemo, useRef, useState } from "react";
import { FormItemProps, Table } from "antd";
import { ColumnType, TableProps } from "antd/lib/table";
import { EditableRow, EditableCell } from "./edit-row-cell";
import useFormatColumn from "./use-format-column";
import styles from "./style.module.scss";
import useRefCallback from "@/hooks/state/use-ref-callback";
import ColumnForm, { ColumnFormProps, ColumnFormRef } from "./column-form";
import withDefaultProps from "@/hocs/withDefaultProps";
import { TimeFormatContext } from "../../utils/context";
import { DrawerFormProps } from "../../Form/DrawerForm/interface";
import { ModalFormProps } from "../../Form/ModalForm/interface";

// TODO: shouldCellUpdate 优化 table
// 可编辑表格
export interface ColumnExtendProps extends FormItemProps {
	edit?: JSX.Element;
	hide?: boolean;
}
export interface EditableTableProps<RecordType extends object = any>
	extends Omit<TableProps<RecordType>, "columns" | "onChange"> {
	columns?: Array<ColumnType<RecordType> & ColumnExtendProps>;
	/** 编辑方式 单元格编辑 模态框编辑 */
	type: "cell" | "modal" | "drawer";
	onChange?: (recordList: RecordType[]) => void;
	rowKey: string;
	onAdd?: (record: RecordType) => RecordType;
	addTitle?: ColumnFormProps["title"];
	editTitle?: ColumnFormProps["title"];
	formProps?: Omit<DrawerFormProps<RecordType> | ModalFormProps<RecordType>, "onFinish">;
}

export interface EditableTableRef<RecordType extends object = any> {
	add: (record?: RecordType) => void;
	edit: (record: RecordType) => void;
	delete: (record: RecordType) => void;
}
function EditableTable<RecordType extends object = any>(
	props: EditableTableProps<RecordType>,
	ref: Ref<EditableTableRef<RecordType>>
) {
	const {
		dataSource,
		columns: $columns,
		onChange,
		rowKey,
		type,
		addTitle,
		editTitle,
		onAdd,
		formProps,
		...rest
	} = props;

	const addFormRef = useRef<ColumnFormRef>(null);
	const editFormRef = useRef<ColumnFormRef>(null);
	const [editRecord, setEditRecord] = useState<RecordType | null>(null); // 记录当前修改的数据项

	const [innerDataSource, setInnerDataSource] = useState<readonly RecordType[]>([]);

	useEffect(() => {
		if (dataSource) setInnerDataSource(dataSource); // 同步外部数据
	}, [dataSource]);

	// 保存数据
	const handleAddRecord = useRefCallback(async (values) => {
		const newRecord = onAdd?.(values) ?? { [rowKey]: Date.now(), ...values };
		const newData = innerDataSource.concat(newRecord);
		if (onChange) await onChange(newData);
		else setInnerDataSource(newData);
		addFormRef.current?.form.resetFields();
		return true;
	});
	const handleEditRecord = useRefCallback(async (values) => {
		const newData = innerDataSource.map((item) => {
			let record = editRecord!;
			if (type === "cell") record = values;
			if (record[rowKey] === item[rowKey]) return { ...item, ...values };
			return item;
		});

		if (onChange) await onChange(newData);
		else setInnerDataSource(newData);
		return true;
	});

	const [tableColumns, formColumns] = useFormatColumn(type, $columns ?? [], handleEditRecord);

	const components = useMemo(() => {
		if (type === "cell") return { body: { row: EditableRow, cell: EditableCell } };
	}, [type]);

	const handleAdd = useRefCallback((record?: RecordType) => {
		if (type === "cell") {
			handleAddRecord(record);
		} else addFormRef.current?.on();
	});
	const handleEdit = useRefCallback((record: RecordType) => {
		if (type === "cell") {
			console.error(`edit type is type not allow run this event`);
			return;
		}
		editFormRef.current?.on();
		if (record !== editRecord) {
			editFormRef.current?.form.setFieldsValue(record);
			setEditRecord(record);
		}
	});
	const handleDelete = useRefCallback((record: RecordType) => {
		const newData = innerDataSource.filter((item) => record[rowKey] !== item[rowKey]);
		if (onChange) onChange(newData);
		else setInnerDataSource(newData);
	});

	useImperativeHandle(ref, () => ({ add: handleAdd, edit: handleEdit, delete: handleDelete }), [
		handleAdd,
		handleEdit,
		handleDelete,
	]);

	return (
		<div className={styles.editable_table_wrap}>
			<TimeFormatContext.Provider>
				<Table<RecordType>
					columns={tableColumns as any[]}
					bordered
					{...rest}
					components={components}
					dataSource={innerDataSource}
				/>

				<ColumnForm
					type={type}
					columns={formColumns}
					ref={addFormRef}
					title={addTitle ?? "新增数据"}
					{...formProps}
					onFinish={handleAddRecord}
				/>
				<ColumnForm
					type={type}
					columns={formColumns}
					ref={editFormRef}
					title={editTitle ?? "编辑数据"}
					{...formProps}
					onFinish={handleEditRecord}
				/>
			</TimeFormatContext.Provider>
		</div>
	);
}

// TODO 泛型组件使用withDefaultProps后丢失了泛型功能 后期修正
// const EEE:React.FunctionComponent<EditableTableProps<T extends object = any>> = EditableTable<T>;

export default withDefaultProps(forwardRef(EditableTable), {
	rowKey: "key",
	type: "cell",
});

/**
 * Q: 给 drawerForm 和 modalForm传递属性
 */
