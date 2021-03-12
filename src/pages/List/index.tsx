import React, { Ref, useState, forwardRef } from "react";
import PageHeaderWrap from "@/components/PageHeaderWrap";
import { Form, Input, InputNumber } from "antd";

import styles from "./style.module.scss";
import EditableTable, { EditableTableProps } from "@/components/Pro/EditableTable";

const ProInput = forwardRef(({ name, ...props }: any, ref: Ref<any>) => {
	return (
		<Form.Item rules={[{ required: true, message: "1231" }]} name={name}>
			<Input {...props} ref={ref} />
		</Form.Item>
	);
});
const ProInputNumber = forwardRef(({ name, ...props }: any, ref: Ref<any>) => {
	return (
		<Form.Item rules={[{ required: true, message: "1231" }]} name={name}>
			<InputNumber {...props} ref={ref} style={{ width: "100%" }} />
		</Form.Item>
	);
});

const __columns: EditableTableProps["columns"] = [
	{
		title: "name",
		dataIndex: "name",
		width: "30%",
		edit: <ProInput />,
	},
	{
		title: "age",
		dataIndex: "age",
		width: "30%",
		edit: <ProInputNumber />,
	},
	{
		title: "address",
		dataIndex: "address",
	},
];
export default function List() {
	const [data, setData] = useState(() =>
		Array.from({ length: 100 }, (_, i) => ({
			key: i,
			name: "Edward King 0",
			age: "32",
			address: "London, Park Lane no. 0",
		}))
	);
	return (
		<div className={styles.list_page_wrap}>
			<PageHeaderWrap title='page title' className={styles.page_title} />
			<main className='bg-white h-screen p-5'>
				<EditableTable
					columns={__columns}
					dataSource={data}
					onDataSourceChange={(records: typeof data) => {
						setData(records);
					}}
				/>
			</main>
		</div>
	);
}
