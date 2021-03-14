import React, { useState, useRef, forwardRef } from "react";
import moment, { isMoment } from "moment";
import PageHeaderWrap from "@/components/PageHeaderWrap";
import { Button, DatePicker, Descriptions, Drawer, Input, Modal, Popconfirm, Select, Table } from "antd";

import styles from "./style.module.scss";
import EditableTable, { EditableTableProps, EditableTableRef } from "@/components/Pro/EditableTable";

const ProDatePicker = forwardRef((props: any, ref) => {
	const { value: __value, name, ...rest } = props;
	const value = isMoment(__value) ? __value : moment(__value);
	console.log(value);
	return <DatePicker value={value} {...rest} />;
});

export default function List() {
	const ref = useRef<EditableTableRef>(null);
	const [type, setType] = useState<EditableTableProps["type"]>("cell");
	const [data, setData] = useState(() =>
		Array.from({ length: 100 }, (_, i) => ({
			key: i,
			time: "2021-3-14",
			name: `"Edward King 0"${i}`,
			age: "32" + i,
			address: "London, Park Lane no. 0",
		}))
	);
	const __columns: EditableTableProps["columns"] = [
		{
			title: "name",
			dataIndex: "name",
			width: "30%",
			edit: <Input />,
		},
		{
			title: "age",
			dataIndex: "age",
			width: "30%",
			edit: <Select options={Array.from({ length: 100 }, (_, i) => ({ label: i, value: i }))} />,
		},
		{
			title: "time",
			dataIndex: "time",
			width: "20%",
			edit: <ProDatePicker />,
		},
		{
			title: "address",
			dataIndex: "address",
		},
		{
			title: "action",
			key: "action",
			fixed: "right",
			render: (value) => {
				return (
					<>
						<Button
							onClick={() => {
								ref.current?.edit(value);
							}}
							className='mb-4'
						>
							编辑
						</Button>
						<Popconfirm title='确定删除吗?' onConfirm={() => ref.current?.delete(value)}>
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
				<Descriptions.Item label='addTitle/editTitle'>string|{`title:string,tip:string`}</Descriptions.Item>
				<Descriptions.Item>type != 'cell'时的添加/修改标题</Descriptions.Item>
				<Descriptions.Item label='ref属性'>{`add,edit,delete`}</Descriptions.Item>
				<Descriptions.Item>增加,修改,删除</Descriptions.Item>
			</Descriptions>
			<main className='bg-white h-screen p-5'>
				<div className='pb-4 text-right'>
					<Select
						defaultValue='cell'
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
				<EditableTable
					type={type}
					size='middle'
					columns={__columns}
					dataSource={data}
					ref={ref}
					addTitle='新增一条数据'
					onChange={(records) => {
						setData(records as typeof data);
					}}
				/>
				{/* <Table size='middle' columns={__columns} dataSource={data} scroll={{ x: 1400 }} /> */}
			</main>
		</div>
	);
}