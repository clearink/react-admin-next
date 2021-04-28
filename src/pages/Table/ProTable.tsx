import PageHeaderWrap from "@/components/PageHeaderWrap";
import ProTable from "@/components/Pro/Table/ProTable";
import { ProColumnsType, ProTableRef } from "@/components/Pro/Table/ProTable/interface";
import useTitle from "@/hooks/ui/use-title";
import { sleep } from "@/utils/Test";
import { Button, Form, Input } from "antd";
import { useState } from "react";
const dataSource = [
	{
		key: "1",
		name: "胡彦斌",
		age: {
			age: {
				age: 32,
			},
		},
		address: "西湖区湖底公园1号",
	},
	{
		key: "2",
		name: "胡彦祖",
		age: {
			age: {
				age: 42,
			},
		},
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
		sorter: (a, b) => a.age.age.age - b.age.age.age,
		filters: [
			{
				text: "Joe",
				value: "Joe",
			},
			{
				text: "Joe23",
				value: "Joe232",
			},
		],
		defaultFilteredValue:['Joe232','Joe'],
	},
	{
		title: "年龄",
		dataIndex: ["age", "age", "age"],
		search: (
			<Form.Item label='年龄'>
				<Input />
			</Form.Item>
		),
		sorter: {
			compare: (a, b) => a.age.age.age - b.age.age.age,
			multiple: 1,
		},
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
		sorter: {
			compare: (a, b) => a.address.length - b.address.length,
			multiple: 2,
		},
	},
];
export default function ProTablePage() {
	useTitle("增强表格");
	const [p, setP] = useState(1);
	return (
		<div className='min-h-full flex flex-col'>
			<PageHeaderWrap title='增强表格' />
			<main className='flex-auto bg-white mt-10'>
				<Button onClick={() => setP(p + 1)}>1231212</Button>
				<ProTable
					tableTitle='12sadsdfsdf12112'
					columns={columns}
					bordered
					dataSource={dataSource}
					request={async (params, filter, sort) => {
						await sleep(1420);
						console.log("params filter sort\n", params, filter, sort);
						return { dataSource: [], total: 100 };
					}}
				/>
			</main>
		</div>
	);
}
