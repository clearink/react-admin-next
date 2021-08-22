import { useState } from "react";
import { Button } from "antd";
import { ProFormInput } from "@/components/Pro/FormItem";
import { ProTable } from "@/components/Pro/Table";
import { ProColumnsType } from "@/components/Pro/Table/ProTable/interface";
import useDrawerForm from "@/hooks/action/use-drawer-form";
// import "@/components/Pro/utils/merge-value";
interface Item {
	id: string | number;
	name: string;
	age: string;
	content: string;
}

function A(props: { a: number; c: string }) {
	console.log("A props", props);
	return (
		<>
			<ProFormInput required label='name' name='name' />
			<ProFormInput label='age' name='age' />
			<ProFormInput label='content' name='content' />
		</>
	);
}
export default function DashBoard() {
	// const [FormAddModal, handleOpen] = useModalAction(B);
	const [FormAddModal, handleOpen] = useDrawerForm(A);

	const columns: ProColumnsType<Item> = [
		{
			title: { title: "123", tip: "11212" },
			dataIndex: "name",
			search: <ProFormInput label={false} />,
			width: 200,
		},
		{
			title: "age",
			dataIndex: "age",
			width: 200,
		},
		{
			title: "content",
			dataIndex: "content",
		},
		{
			title: "action",
			key: "action",
			render: (dom, record, index, action) => {
				return [
					<Button
						type='link'
						size='small'
						key='useModalForm'
						onClick={() => {
							handleOpen({ c: record.content });
						}}
					>
						open useModalForm
					</Button>,
					<Button type='link' size='small' key='delete'>
						delete
					</Button>,
				];
			},
		},
	];
	const [data] = useState<Item[]>(() =>
		Array.from({ length: 30 }, (_, i) => ({
			id: i,
			name: `name-${i}`,
			age: `age-${i}`,
			content: Math.random().toString(16).slice(2),
		}))
	);
	return (
		<div>
			<ProTable columns={columns} dataSource={data} />
			<FormAddModal title='测试 useDrawerForm' />
		</div>
	);
}
