import { forwardRef, Ref, useImperativeHandle, useMemo, useRef, useState } from "react";
import { Table } from "antd";
import { EditableRow, EditableCell } from "./components/EditRowCell";
import useFormatColumn from "./hooks/use-format-column";
import styles from "./style.module.scss";
import useRefCallback from "@/hooks/state/use-ref-callback";
import ColumnForm from "./components/ColumnForm";
import withDefaultProps from "@/hocs/withDefaultProps";
import { EditableTableProps, EditableTableRef, EditableTableType } from "./interface";
import { ColumnFormRef } from "./components/ColumnForm/interface";
import { isUndefined } from "@/utils/ValidateType";

// TODO: shouldCellUpdate 优化 table
// 可编辑表格

function EditableTable<RT extends object = any>(
	props: EditableTableProps<RT>,
	ref: Ref<EditableTableRef<RT>>
) {
	const {
		dataSource: $dataSource,
		columns: $columns,
		onCreate,
		onDataChange,
		rowKey,
		type,
		addTitle,
		editTitle,
		formProps,
		...rest
	} = props;

	const [tableCol, formCol] = useFormatColumn($columns ?? []);

	const addRef = useRef<ColumnFormRef>(null); // 新增 form
	const editRef = useRef<ColumnFormRef>(null); // 编辑 form

	const [editRecord, setEditRecord] = useState<RT | null>(null); // 记录当前修改的数据项

	const [_dataSource, setDataSource] = useState<readonly RT[]>([]); // 内部 dataSource

	const dataSource = $dataSource ?? _dataSource;

	/** ---------------------------------方法 start ---------------------------------------- */
	const handleChange = async (newData: RT[]) => {
		if (onDataChange) await onDataChange(newData);
		else setDataSource(newData);
	};

	// 新增数据
	const handleCreate = useRefCallback(async (values) => {
		const newRecord = onCreate?.(values) ?? { [rowKey!]: Date.now(), ...values };

		await handleChange(_dataSource.concat(newRecord));
		addRef.current?.form.resetFields();

		return true;
	});

	// 修改数据
	const handleEdit = useRefCallback(async (values: RT) => {
		const newData = dataSource.map((item) => {
			const record = type === "cell" ? values : {...editRecord, ...values};
			if (isUndefined(rowKey) || record[rowKey] !== item[rowKey]) return item;
			return { ...item, ...record };
		});
		await handleChange(newData);
		return true;
	});
	/** ---------------------------------方法 end ---------------------------------------- */

	/** ---------------------------------属性扩展 start ---------------------------------------- */
	const handleOnRow = useRefCallback((record: RT, index: number) => {
		if (type === "cell") {
			return {
				...rest.onRow?.(record, index),
				form: formProps,
				record,
				handleEdit,
			};
		}
	});
	/** ---------------------------------属性扩展 end ---------------------------------------- */

	/* ----------------------------------暴露的方法 start--------------------------------------- */

	// 创建
	const handleCreateRecord = useRefCallback((record?: RT) => {
		if (type === "cell") handleCreate(record);
		else addRef.current?.on();
	});

	// 修改
	const handleEditRecord = useRefCallback((record: RT) => {
		if (type === "cell") {
			console.error(`cell 模式下无法执行该操作`);
			return;
		}
		editRef.current?.on();
		if (record !== editRecord) {
			editRef.current?.form.setFieldsValue(record);
			setEditRecord(record);
		}
	});

	// 删除
	const handleDeleteRecord = useRefCallback((record: RT) => {
		const newData = dataSource.filter((item) => record[rowKey!] !== item[rowKey!]);
		handleChange(newData);
	});

	useImperativeHandle(
		ref,
		() => ({ add: handleCreateRecord, edit: handleEditRecord, delete: handleDeleteRecord }),
		[handleCreateRecord, handleEditRecord, handleDeleteRecord]
	);
	/* ----------------------------------暴露的方法 end--------------------------------------- */

	/* ----------------------------------组件替换 start--------------------------------------- */
	const components = useMemo(() => {
		if (type === "cell") return { body: { row: EditableRow, cell: EditableCell } };
	}, [type]);

	/* ----------------------------------组件替换 end--------------------------------------- */
	return (
		<div className={styles.editable_table_wrap}>
			<Table<RT>
				{...rest}
				columns={tableCol}
				components={components}
				onRow={handleOnRow as any}
				dataSource={dataSource}
			/>

			{/* 新增form */}
			<ColumnForm<RT>
				type={type}
				ref={addRef}
				title={addTitle}
				name={`editable-add-form-${addTitle}`}
				{...formProps}
				onFinish={handleCreate}
			>
				{formCol}
			</ColumnForm>
			{/* 编辑form */}
			<ColumnForm<RT>
				type={type}
				ref={editRef}
				title={editTitle}
				name={`editable-edit-form-${editTitle}`}
				{...formProps}
				onFinish={handleEdit}
			>
				{formCol}
			</ColumnForm>
		</div>
	);
}

// TODO 泛型组件使用withDefaultProps后丢失了泛型功能 后期修正

export default withDefaultProps(forwardRef(EditableTable), {
	rowKey: "key",
	type: "cell",
}) as EditableTableType;

/**
 * Q: 给 drawerForm 和 modalForm传递属性
 */
