import {
	forwardRef,
	Ref,
	useCallback,
	useImperativeHandle,
	useMemo,
	useRef,
	useState,
} from "react";
import { FormInstance, Table } from "antd";
import merge from "lodash/merge";
import { isUndefined } from "@/utils/ValidateType";
import withDefaultProps from "@/hocs/withDefaultProps";
import useRefCallback from "@/hooks/state/use-ref-callback";
import useFormatColumn from "./hooks/use-format-column";
import {
	DatChangeType,
	EditableTableProps,
	EditableTableRef,
	EditableTableType,
} from "./interface";

import EditableTableForm, { EditableTableFormRef } from "./components/EditableTableForm";
import { useEffect } from "react";
import EditableRow from "./components/EditableRow";
import EditableCell from "./components/EditableCell";

// 可编辑表格
function EditableTable<RT extends object = any>(
	props: EditableTableProps<RT>,
	ref: Ref<EditableTableRef<RT>>
) {
	const {
		dataSource: $dataSource,
		columns,
		onDataChange,
		rowKey,
		editType,
		addTitle,
		editTitle,
		editFormProps,
		...rest
	} = props;

	const actionRef = useRef<EditableTableRef<RT>>();
	const addRef = useRef<EditableTableFormRef<RT>>(null);
	const editRef = useRef<EditableTableFormRef<RT>>(null);
	const [tableCol, editCol] = useFormatColumn(columns, actionRef, editType);

	const [_dataSource, setDataSource] = useState<readonly RT[]>([]); // 内部 dataSource

	const dataSource = $dataSource ?? _dataSource;

	/* ---------------------------------方法 start ---------------------------------------- */
	// table 数据更改
	const handleChange = useCallback(
		async (newData: RT[], record: RT, type: DatChangeType) => {
			let ret = true;
			if (!onDataChange) setDataSource(newData);
			else ret = await onDataChange?.(newData, record, type);
			return ret;
		},
		[onDataChange]
	);

	// 开始新增数据
	const handleCreate2 = () => {};
	// 开始编辑数据
	const handleEdit2 = () => {};

	// 新增数据
	const handleCreate = useRefCallback(async (props?: any, values?: any, form?: FormInstance) => {
		const record = { [rowKey!]: Date.now(), ...values! };
		await handleChange(dataSource.concat(record), record, "add");
		return true;
	});

	// 修改数据
	const handleEdit = useRefCallback(async ($record?: any, values?: any) => {
		const record = merge($record, values);
		const newData = dataSource.map((item) => {
			if (isUndefined(rowKey) || record[rowKey] !== item[rowKey]) return item;
			return { ...item, ...record };
		});
		await handleChange(newData, record as RT, "edit");
		return true;
	});

	// 删除
	const handleDelete = useRefCallback((record: RT) => {
		const newData = dataSource.filter((item) => record[rowKey!] !== item[rowKey!]);
		handleChange(newData, record, "delete");
	});
	/* ---------------------------------方法 end ---------------------------------------- */
	/* ----------------------------------暴露的方法 start--------------------------------------- */

	// 暴露的方法
	useEffect(() => {
		actionRef.current = {
			add: addRef.current!,
			edit: editRef.current!,
			delete: handleDelete,
		};
	}, [handleDelete]);

	// 暴露的事件
	useImperativeHandle(
		ref,
		() => ({ add: addRef.current!, edit: editRef.current!, delete: handleDelete }),
		[handleDelete]
	);

	const tableLayout = useMemo(() => {
		if (props.tableLayout) return props.tableLayout;
		return columns?.some((item) => item.ellipsis) ? "fixed" : "auto";
	}, [props.tableLayout, columns]);

	/* ----------------------------------暴露的方法 end--------------------------------------- */

	// cell 编辑模式
	const components = useMemo(() => {
		if (editType !== "cell") return undefined;
		return { body: { row: EditableRow, cell: EditableCell } };
	}, [editType]);
	return (
		<>
			<Table<RT>
				{...rest}
				tableLayout={tableLayout}
				components={components}
				columns={tableCol}
				dataSource={dataSource}
			/>
			{/* 新增 form */}
			<EditableTableForm<RT>
				add
				type={editType}
				ref={addRef}
				title={addTitle}
				formProps={{ name: `add-${addTitle}`, ...editFormProps }}
				onOk={handleCreate}
			>
				{editCol}
			</EditableTableForm>
			{/* 编辑form */}
			<EditableTableForm<RT>
				type={editType}
				ref={editRef}
				title={editTitle}
				onOpen={(record: any, form) => {
					form.setFieldsValue(record);
					return Promise.resolve(true);
				}}
				onOk={handleEdit}
				formProps={{ name: `edit-${editTitle}`, ...editFormProps }}
			>
				{editCol}
			</EditableTableForm>
		</>
	);
}

export default withDefaultProps(forwardRef(EditableTable), {
	size: "middle",
	bordered: true,
	rowKey: "key",
	editType: "modal",
	addTitle: "新增数据",
	editTitle: "编辑数据",
}) as EditableTableType;
