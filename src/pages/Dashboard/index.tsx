import { useState } from "react";
import { Button } from "antd";
import { ProFormInput } from "@/components/Pro/FormItem";
import { ProTable } from "@/components/Pro/Table";
import { ProColumnsType } from "@/components/Pro/Table/ProTable/interface";
import { CreateModalForm } from "@/hooks/action/use-modal-form";
// import "@/components/Pro/utils/merge-value";
interface Item {
	id: string | number;
	name: string;
	age: string;
	content: string;
}

function ComponentA(props: { a: number; c: string; name: string }) {
	console.log("A props", props);
	return (
		<>
			<ProFormInput required label='name' name='name' />
			<ProFormInput label='age' name='age' />
			<ProFormInput label='content' name='content' />
		</>
	);
}
const [FormModalA, handleOpenA] = CreateModalForm(ComponentA);
const [FormModalB, handleOpenB] = CreateModalForm(ComponentA);
export default function DashBoard() {
	// const [FormAddModal, handleOpen] = useModalAction(B);

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
			search: <ProFormInput label={false} />,
		},
		{
			title: "content",
			dataIndex: "content",
			search: <ProFormInput label={false} />,
		},
		{
			title: "action",
			key: "action",
			render: (dom, record, index, action) => {
				return [
					<Button
						type='link'
						size='small'
						key='ModalFormA'
						onClick={() => {
							handleOpenA({ c: record.content, name: "a" });
						}}
					>
						open ModalFormA
					</Button>,
					<Button
						type='link'
						size='small'
						key='ModalFormB'
						onClick={() => {
							handleOpenB({ c: record.content, name: "b" });
						}}
					>
						open ModalFormB
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
			<ProTable
				columns={columns}
				dataSource={data}
				onCreate={() => {}}
				onDelete={() => {}}
				tableTitle={{ title: "123123", tip: "1212" }}
			/>
			<FormModalA title='测试 FormModalA' />
			<FormModalB title='测试 FormModalB' />
		</div>
	);
}
