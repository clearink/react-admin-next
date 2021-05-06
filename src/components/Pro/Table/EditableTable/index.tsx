import { forwardRef, Ref, useEffect, useImperativeHandle, useMemo, useRef, useState } from "react";
import { Table } from "antd";
import { EditableRow, EditableCell } from "./components/EditRowCell";
import useFormatColumn from "./hooks/use-format-column";
import styles from "./style.module.scss";
import useRefCallback from "@/hooks/state/use-ref-callback";
import ColumnForm from "./components/ColumnForm";
import withDefaultProps from "@/hocs/withDefaultProps";
import { EditableTableProps, EditableTableRef, EditableTableType } from "./interface";
import { ColumnFormRef } from "./components/ColumnForm/interface";
import { checkLocalData } from "../../utils";

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

	const addFormRef = useRef<ColumnFormRef>(null);
	const editFormRef = useRef<ColumnFormRef>(null);
	const [editRecord, setEditRecord] = useState<RT | null>(null); // 记录当前修改的数据项

	const [_dataSource, setDataSource] = useState<readonly RT[]>([]);

	const dataSource = $dataSource ?? _dataSource;

	const handleChange = async (newData: RT[]) => {
		if (onDataChange) await onDataChange(newData);
		else setDataSource(newData);
	};

	// 新增数据
	const handleCreate = useRefCallback(async (values) => {
		const newRecord = onCreate?.(values) ?? { [rowKey!]: Date.now(), ...values };

		await handleChange(_dataSource.concat(newRecord));
		addFormRef.current?.form.resetFields();

		return true;
	});

	// 修改数据
	const handleEdit = useRefCallback(async (values) => {
		const newData = dataSource.map((item) => {
			let record = editRecord!;
			if (type === "cell") record = values;
			if (record[rowKey!] === item[rowKey!]) return { ...item, ...values };
			return item;
		});
		await handleChange(newData);
		return true;
	});

	const [tableCol, formCol] = useFormatColumn(type, $columns ?? [], handleEdit);

	const components = useMemo(() => {
		if (type === "cell") return { body: { row: EditableRow, cell: EditableCell } };
	}, [type]);




	/* ----------------------------------暴露的方法 start--------------------------------------- */

	// 创建
	const handleCreateRecord = useRefCallback((record?: RT) => {
		if (type === "cell") handleCreate(record);
		else addFormRef.current?.on();
	});

	// 修改
	const handleEditRecord = useRefCallback((record: RT) => {
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

	return (
		<div className={styles.editable_table_wrap}>
			<Table<RT> {...rest} columns={tableCol} components={components} dataSource={dataSource} />

			{/* 新增form */}
			<ColumnForm<RT>
				type={type}
				ref={addFormRef}
				title={addTitle}
				{...formProps}
				onFinish={handleCreate}
			>
				{formCol}
			</ColumnForm>
			{/* 编辑form */}
			<ColumnForm<RT>
				type={type}
				ref={editFormRef}
				title={editTitle}
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
