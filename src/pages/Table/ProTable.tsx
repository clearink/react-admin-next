import PageHeaderWrap from "@/components/PageHeaderWrap";
import ProTable from "@/components/Pro/Table/ProTable";
import { ProColumnsType } from "@/components/Pro/Table/ProTable/interface";
import useTitle from "@/hooks/ui/use-title";
import { Button, Form, FormInstance, Input } from "antd";
import { useEffect, useRef } from "react";
const dataSource = [
	{
		key: "1",
		name: "胡彦斌",
		age: 32,
		address: "西湖区湖底公园1号",
	},
	{
		key: "2",
		name: "胡彦祖",
		age: 42,
		address: "西湖区湖底公园1号",
	},
];
const columns: ProColumnsType<typeof dataSource[0]> = [
	{
		title: "姓名",
		dataIndex: "name",
		key: "name",
		search: (
			<Form.Item label='姓名'>
				<Input />
			</Form.Item>
		),
		sorter: (a, b) => a.age - b.age,
		filters: [
			{
				text: "Joe",
				value: "Joe",
			},
		],
	},
	{
		title: "年龄",
		dataIndex: "age",
		search: (
			<Form.Item label='年龄'>
				<Input />
			</Form.Item>
		),
		sorter: (a, b) => a.age - b.age,
		filters: [
			{
				text: "Joe",
				value: "Joe",
			},
		],
	},
	{
		title: "Address",
		dataIndex: "address",
		filters: [
			{
				text: "London",
				value: "London",
			},
		],
		sorter: (a, b) => a.address.length - b.address.length,
	},
];
export default function ProTablePage() {
	useTitle("增强表格");
	return (
		<div className='min-h-full flex flex-col'>
			<PageHeaderWrap title='增强表格' />
			<main className='flex-auto bg-white mt-10'>
				<ProTable
					tableTitle='12sadsdfsdf12112'
					columns={columns}
					bordered
					dataSource={dataSource}
				/>
			</main>
		</div>
	);
}
