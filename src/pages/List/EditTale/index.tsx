import React, { useContext, useEffect, useRef, useState } from "react";
import PageHeaderWrap from "@/components/PageHeaderWrap";
import { Button, Form, FormInstance, Input, Modal, Table } from "antd";
import styles from "./style.module.scss";

export interface EditableRowProps {
	index: number;
	[key: string]: any;
}
interface Item {
	key: string;
	name: string;
	age: string;
	address: string;
}

const EditableContext = React.createContext<FormInstance | null>(null);
// 可编辑行
function EditableRow(props: EditableRowProps) {
	const { index, ...rest } = props;
	const [form] = Form.useForm();
	return (
		<Form form={form} component={false}>
			<EditableContext.Provider value={form}>
				<tr {...rest} />
			</EditableContext.Provider>
		</Form>
	);
}

export interface EditableCellProps {
	title: React.ReactNode;
	editable: boolean;
	children: React.ReactNode;
	dataIndex: keyof Item;
	record: Item;
	handleSave: (record: Item) => void;
}
function EditableCell(props: EditableCellProps) {
	const { title, editable, children, dataIndex, record, handleSave, ...rest } = props;
	const [editing, setEditing] = useState(false);
	const inputRef = useRef<Input>(null);
	const form = useContext(EditableContext);
	useEffect(() => {
		if (editing) inputRef.current?.focus();
	}, [editing]);
	const toggleEdit = () => {
		setEditing((p) => !p);
		form?.setFieldsValue({ [dataIndex]: record[dataIndex] });
	};
	const save = async () => {
		try {
			const values = await form?.validateFields();
			toggleEdit();
			handleSave({ ...record, ...values! });
		} catch (error) {
			console.log("save failed", error);
		}
	};
	let childNode = children;
	if (editable) {
		childNode = editing ? (
			<Form.Item
				style={{ margin: 0 }}
				name={dataIndex}
				rules={[
					{
						required: true,
						message: `${title} is required.`,
					},
				]}
			>
				<Input ref={inputRef} onPressEnter={save} onBlur={save} />
			</Form.Item>
		) : (
			<div className={styles["editable-cell-value-wrap"]} style={{ paddingRight: 24 }} onClick={toggleEdit}>
				{children}
			</div>
		);
	}
	return <td {...rest}>{childNode}</td>;
}

type EditableTableProps = Parameters<typeof Table>[0];
interface DataType {
	key: React.Key;
	name: string;
	age: string;
	address: string;
}

interface EditableTableState {
	dataSource: DataType[];
	count: number;
}
type ColumnTypes = Exclude<EditableTableProps["columns"], undefined>;

type ColumnsType = ColumnTypes[number] & { editable?: boolean; dataIndex: string };

const __columns: ColumnsType[] = [
	{
		title: "name",
		dataIndex: "name",
		width: "30%",
		editable: true,
	},
	{
		title: "age",
		dataIndex: "age",
	},
	{
		title: "address",
		dataIndex: "address",
	},
	{
		title: "operation",
		dataIndex: "operation",
		render: (_, record: { key: React.Key }) =>
			this.state.dataSource.length >= 1 ? (
				<Popconfirm title='Sure to delete?' onConfirm={() => this.handleDelete(record.key)}>
					<a>Delete</a>
				</Popconfirm>
			) : null,
	},
];
const __dataSource = [
	{
		key: "0",
		name: "Edward King 0",
		age: "32",
		address: "London, Park Lane no. 0",
	},
	{
		key: "1",
		name: "Edward King 1",
		age: "32",
		address: "London, Park Lane no. 1",
	},
];
function EditableTable(props: EditableTableProps) {
	const [dataSource, setDataSource] = useState<DataType[]>(__dataSource);
	const [count, setCount] = useState(2);
	const handleAdd = () => {
		const newData: DataType = {
			key: count,
			name: `Edward King ${count}`,
			age: "32",
			address: `London, Park Lane no. ${count}`,
		};
		setDataSource((p) => p.concat(newData));
		setCount((p) => p + 1);
	};
	const handleSave = (row: DataType) => {
		const newData = dataSource.slice();
		const index = newData.findIndex((item) => row.key === item.key);
		const item = newData[index];
		newData.splice(index, 1, {
			...item,
			...row,
		});
		setDataSource(newData);
	};
	const columns = __columns.map((col) => {
		if (!col.editable) return col;
		return {
			...col,
			onCell: (record: DataType) => ({
				record,
				editable: col.editable,
				dataIndex: col.dataIndex,
				title: col.title,
				handleSave,
			}),
		};
	});
	return (
		<div>
			<Button onClick={handleAdd} type='primary' className='mb-4'>
				add a row
			</Button>
			<Table
				bordered
				components={{
					body: {
						row: EditableRow,
						cell: EditableCell,
					},
				}}
				rowClassName={styles["editable-row"]}
				dataSource={dataSource}
				columns={columns as ColumnTypes}
			/>
		</div>
	);
}
export default function EditTable() {
	return (
		<div className={styles.list_page_wrap}>
			<PageHeaderWrap title='可编辑表格' className={styles.page_title} />
			<main className='bg-white h-screen mt-8'>
				<EditableTable />
			</main>
		</div>
	);
}
