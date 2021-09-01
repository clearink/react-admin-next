import React, { useState, useRef } from "react";
import PageHeaderWrap from "@/components/PageHeaderWrap";
import { Button, Popconfirm, Select } from "antd";

import EditableTable from "@/components/Pro/Table/EditableTable";
import {
	EditableColumnsType,
	EditableTableRef,
	EditType,
} from "@/components/Pro/Table/EditableTable/interface";
import { ProFormInput, ProFormSelect } from "@/components/Pro/FormItem";
import { FieldStatus } from "@/components/Pro/Field";
import styles from "./style.module.scss";
import LinkButton from "@/components/Company/LinkButton";
const __columns: EditableColumnsType<any> = [
	{
		title: { title: "name", tip: "name-tip" },
		dataIndex: "name",
		width: "30%",
		edit: <ProFormInput required />,
	},
	{
		title: "age",
		dataIndex: "age",
		width: "30%",
		edit: (
			<ProFormSelect
				field={{
					valueEnum: Array.from({ length: 30 }, (_, i) => {
						return { label: i, value: i };
					}),
				}}
			/>
		),
		read: <FieldStatus />,
	},
	{
		title: "time",
		dataIndex: "time",
		align: "center",
	},
	{
		title: "address",
		dataIndex: "address",
	},
	{
		title: "action",
		key: "action",
		width: 200,
		render: (dom, record, index, actions) => {
			return (
				<>
					<LinkButton onClick={() => actions.edit(record)}>编辑</LinkButton>
					<Popconfirm title='确定删除吗?' onConfirm={() => actions.delete(record)}>
						<LinkButton danger>删除</LinkButton>
					</Popconfirm>
				</>
			);
		},
	},
];
export default function List() {
	const ref = useRef<EditableTableRef>(null);

	const [type, setType] = useState<EditType>("cell");
	const [data, setData] = useState(() =>
		Array.from({ length: 1 }, (_, i) => ({
			key: i,
			time: "2021-3-14",
			name: `"Edward King 0"${i}`,
			age: i,
			address: "London, Park Lane no. 0",
		}))
	);
	console.log("render");
	return (
		<div className={styles.list_page_wrap}>
			<PageHeaderWrap title='EditableTable介绍' className={styles.page_title} />
			<main className='bg-white min-h-full p-5'>
				<div className='pb-4 text-right'>
					<Select<EditType> defaultValue='modal' onChange={setType} className='w-64 text-left'>
						<Select.Option value='cell'>cell</Select.Option>
						<Select.Option value='modal'>modal</Select.Option>
						<Select.Option value='drawer'>drawer</Select.Option>
					</Select>
					<Button
						type='primary'
						className='ml-10'
						onClick={() => {
							ref.current?.add();
						}}
					>
						新增
					</Button>
				</div>
				<EditableTable<typeof data[0]>
					editType={type}
					size='middle'
					columns={__columns}
					dataSource={data}
					ref={ref}
					pagination={{ pageSize: 10 }}
					onDataChange={(records) => {
						setData(records);
						return true;
					}}
				/>
			</main>
		</div>
	);
}
