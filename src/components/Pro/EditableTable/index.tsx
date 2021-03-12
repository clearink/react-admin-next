import React, { isValidElement, useEffect, useState } from "react";
import { Table } from "antd";
import { ColumnsType, ColumnType, TableProps } from "antd/lib/table";
import { GetRowKey } from "rc-table/lib/interface";
import { isFunction } from "@/utils/ValidateType";
import withDefaultProps from "@/hocs/withDefaultProps";

import { EditableRow, EditableCell } from "./EditRowCell";

export interface EditableTableProps<RecordType = any> extends Omit<TableProps<RecordType>, "columns"> {
	columns?: Array<ColumnType<RecordType> & { edit?: JSX.Element }>;
	onDataSourceChange?: (recordList: any[]) => void;
	rowKey: string | GetRowKey<RecordType>;
}

function EditableTable<RecordType extends object = any>(props: EditableTableProps<RecordType>) {
	const { dataSource, columns: __columns, onDataSourceChange, rowKey, ...rest } = props;

	const [innerDataSource, setInnerDataSource] = useState<readonly RecordType[]>([]);

	useEffect(() => {
		if (dataSource) setInnerDataSource(dataSource); // 同步外部数据
	}, [dataSource]);

	// 保存数据
	const handleSave = (row: RecordType) => {
		const recordKey = isFunction(rowKey) ? rowKey(row) : rowKey;
		const newData = innerDataSource.map((item) => {
			if (row[recordKey] === item[recordKey]) return { ...item, ...row };
			return item;
		});

		if (onDataSourceChange) onDataSourceChange(newData);
		else setInnerDataSource(newData);
	};

	// 计算columns
	const columns = __columns?.map((col) => {
		if (!col.edit || !isValidElement(col.edit)) return col;
		return {
			...col,
			onCell: (record: RecordType) => ({
				record,
				edit: col.edit,
				dataIndex: col.dataIndex,
				handleSave,
			}),
		};
	});
	return (
		<Table<RecordType>
			columns={columns as ColumnsType<any>}
			bordered
			{...rest}
			components={{ body: { row: EditableRow, cell: EditableCell } }}
			dataSource={innerDataSource}
		/>
	);
}

// type Props<T extends object = any> = Omit<EditableTableProps<T>, "rowKey"> & {
// 	rowKey?: EditableTableProps<T>["rowKey"];
// };

// TODO 泛型组件使用withDefaultProps后丢失了泛型功能 后期修正
export default withDefaultProps(EditableTable, { rowKey: "key" });
