import React, { useState, useRef } from "react";
import PageHeaderWrap from "@/components/PageHeaderWrap";
import { Button, Descriptions, Popconfirm, Select, Space } from "antd";

import EditableTable from "@/components/Pro/Table/EditableTable";
import {
	EditableColumnsType,
	EditableTableRef,
	EditType,
} from "@/components/Pro/Table/EditableTable/interface";
import { ProFormDatePicker, ProFormInput, ProFormSelect } from "@/components/Pro/FormItem";
import { FieldStatus } from "@/components/Pro/Field";
import styles from "./style.module.scss";

export default function List() {
	const ref = useRef<EditableTableRef>(null);
	const [type, setType] = useState<EditType>("modal");
	const [data, setData] = useState(() =>
		Array.from({ length: 30 }, (_, i) => ({
			key: i,
			time: "2021-3-14",
			name: `"Edward King 0"${i}`,
			age: i,
			address: "London, Park Lane no. 0",
		}))
	);
	const __columns: EditableColumnsType<any> = [
		{
			title: "name",
			dataIndex: "name",
			width: "30%",
			edit: <ProFormInput />,
		},
		{
			title: "age",
			dataIndex: "age",
			width: "30%",
			read: (
				<FieldStatus valueEnum={Array.from({ length: 30 }, (_, i) => ({ label: i, value: i }))} />
			),
			edit: (
				<ProFormSelect
					field={{
						valueEnum: Array.from({ length: 30 }, (_, i) => ({ label: i, value: i })),
					}}
				/>
			),
		},
		{
			title: "time",
			dataIndex: "time",
			width: "20%",
			edit: <ProFormDatePicker />,
		},
		{
			title: "address",
			dataIndex: "address",
		},
		{
			title: "action",
			key: "action",
			fixed: "right",
			width: 200,
			render: (dom, value, record) => {
				return (
					<>
						<Button
							onClick={() => {
								ref.current?.edit(record);
							}}
							className='mr-4'
						>
							编辑
						</Button>
						<Popconfirm title='确定删除吗?' onConfirm={() => ref.current?.delete(record)}>
							<Button danger>删除</Button>
						</Popconfirm>
					</>
				);
			},
		},
	];
	return (
		<div className={styles.list_page_wrap}>
			<PageHeaderWrap title='EditableTable介绍' className={styles.page_title} />
			<Descriptions title='API' bordered column={2} className='pb-10'>
				<Descriptions.Item label='type'>cell | modal | drawer</Descriptions.Item>
				<Descriptions.Item>修改方式</Descriptions.Item>
				<Descriptions.Item label='onAdd'>{`(record)=>record`}</Descriptions.Item>
				<Descriptions.Item>type='cell'时可以给新增的数据一个默认值</Descriptions.Item>
				<Descriptions.Item label='addTitle/editTitle'>
					string|{`title:string,tip:string`}
				</Descriptions.Item>
				<Descriptions.Item>type != 'cell'时的添加/修改标题</Descriptions.Item>
				<Descriptions.Item label='ref属性'>{`add,edit,delete`}</Descriptions.Item>
				<Descriptions.Item>增加,修改,删除</Descriptions.Item>
			</Descriptions>
			<main className='bg-white min-h-full p-5'>
				<div className='pb-4 text-right'>
					<Select<EditType>
						defaultValue='modal'
						onChange={(value) => {
							console.log(value);
							setType(value);
						}}
						className='w-64 text-left'
					>
						<Select.Option value='cell'>cell</Select.Option>
						<Select.Option value='modal'>modal</Select.Option>
						<Select.Option value='drawer'>drawer</Select.Option>
					</Select>
					<Button
						type='primary'
						className='ml-10'
						onClick={() => {
							ref.current?.add({ key: Math.random(), age: 1, name: "2", address: "1212" });
						}}
					>
						新增
					</Button>
				</div>
				<EditableTable<typeof data[0]>
					type={type}
					size='middle'
					columns={__columns}
					dataSource={data}
					ref={ref}
					addTitle='新增数据'
					editTitle='编辑数据'
					onDataChange={(records) => {
						setData(records);
						return true;
					}}
				/>
			</main>
		</div>
	);
}
