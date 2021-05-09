import React, {
	forwardRef,
	Ref,
	useCallback,
	useEffect,
	useImperativeHandle,
	useMemo,
	useRef,
	useState,
} from "react";
import { Table } from "antd";
import { isUndefined } from "@/utils/ValidateType";
import withDefaultProps from "@/hocs/withDefaultProps";
import useRefCallback from "@/hooks/state/use-ref-callback";
import useFormatColumn from "./hooks/use-format-column";

import ColumnForm from "./components/ColumnForm";
import { ColumnFormRef } from "./components/ColumnForm/interface";

import {
	DatChangeType,
	EditableTableProps,
	EditableTableRef,
	EditableTableType,
} from "./interface";
import styles from "./style.module.scss";
import { EditableCell, EditableRow } from "./components/EditRowCell";

// TODO: shouldCellUpdate 优化 table
// 可编辑表格

function EditableTable<RT extends object = any>(
	props: EditableTableProps<RT>,
	ref: Ref<EditableTableRef<RT>>
) {
	const {
		dataSource: $dataSource,
		columns: $columns,
		onDataChange,
		rowKey,
		type,
		addTitle,
		editTitle,
		formProps,
		...rest
	} = props;

	const actionRef = useRef<EditableTableRef<RT> | undefined>(undefined);
	const [tableCol, editCol] = useFormatColumn($columns ?? [], actionRef);

	const addRef = useRef<ColumnFormRef>(null); // 新增 form
	const editRef = useRef<ColumnFormRef>(null); // 编辑 form

	const [editRecord, setEditRecord] = useState<RT | null>(null); // 记录当前修改的数据项

	const [_dataSource, setDataSource] = useState<readonly RT[]>([]); // 内部 dataSource

	const dataSource = $dataSource ?? _dataSource;

	/* ---------------------------------方法 start ---------------------------------------- */
	const handleChange = async (newData: RT[], record: RT, type: DatChangeType) => {
		if (!onDataChange) setDataSource(newData);
		else await onDataChange?.(newData, record, type);
		return true;
	};

	// 新增数据
	const handleCreate = useRefCallback(async (values) => {
		const record = { [rowKey!]: Date.now(), ...values };
		await handleChange(dataSource.concat(record), record, "add");
		addRef.current?.form.resetFields();
		return true;
	});

	// 修改数据
	const handleEdit = useRefCallback(async (values: RT) => {
		const record = { ...editRecord, ...values };
		const newData = dataSource.map((item) => {
			if (isUndefined(rowKey) || record[rowKey] !== item[rowKey]) return item;
			return { ...item, ...record };
		});
		await handleChange(newData, record, "edit");
		return true;
	});

	// 删除数据
	// 删除
	const handleDelete = useRefCallback((record: RT) => {
		const newData = dataSource.filter((item) => record[rowKey!] !== item[rowKey!]);
		handleChange(newData, record, "delete");
	});
	/* ---------------------------------方法 end ---------------------------------------- */
	/* ----------------------------------暴露的方法 start--------------------------------------- */

	// 创建
	const handleStartCreate = useCallback(() => {
		addRef.current?.on();
	}, []);

	// 修改
	const handleStartEdit = useRefCallback((record: RT) => {
		editRef.current?.on();
		if (record !== editRecord) {
			editRef.current?.form.setFieldsValue(record);
			setEditRecord(record);
		}
	});

	const tableAction = useMemo<EditableTableRef<RT>>(
		() => ({ add: handleStartCreate, edit: handleStartEdit, delete: handleDelete }),
		[handleStartCreate, handleStartEdit, handleDelete]
	);

	useEffect(() => {
		actionRef.current = tableAction;
	}, [tableAction]);

	useImperativeHandle(ref, () => tableAction, [tableAction]);

	/* ---------------------------------属性扩展 start ---------------------------------------- */
	const handleOnRow = useRefCallback((record: RT, index: number) => {
		const $ret = rest.onRow?.(record, index);
		const $extend = type === "row" && { form: formProps, record, handleEdit };
		return { ...$ret, ...$extend };
	});
	/* ---------------------------------属性扩展 end ---------------------------------------- */

	/* ----------------------------------暴露的方法 end--------------------------------------- */
	const components = useMemo(() => {
		if (type === "row") return { body: { row: EditableRow, cell: EditableCell } };
	}, [type]);
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
				{editCol}
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
				{editCol}
			</ColumnForm>
		</div>
	);
}

// TODO 泛型组件使用withDefaultProps后丢失了泛型功能 后期修正

export default withDefaultProps(forwardRef(EditableTable), {
	rowKey: "key",
	type: "row",
}) as EditableTableType;
