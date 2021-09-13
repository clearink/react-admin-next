import { useState } from "react";
import { Button } from "antd";
import PageHeaderWrap from "@/components/PageHeaderWrap";
import { ProFormInput } from "@/components/Pro/FormItem";
import { ProTable } from "@/components/Pro/Table";
import { ProColumnsType } from "@/components/Pro/Table/ProTable/interface";
import { CreateModalForm } from "@/hooks/action/use-modal-form";

interface Item {
	id: string | number;
	name: string;
	age: string;
	content: string;
}
const [FormModal, handleOpenForm] = CreateModalForm(() => <></>);
const columns: ProColumnsType<Item> = [
	{
		title: { title: "123", tip: "11212" },
		dataIndex: "name",
		search: <ProFormInput />,
		width: 300,
	},
	{
		title: "age",
		dataIndex: "age",
		search: <ProFormInput />,
		width: 300,
	},
	{
		title: "content",
		dataIndex: "content",
		search: <ProFormInput />,
		width: 300,
	},
	{
		title: "action",
		key: "action",
		width: 400,
		render: (dom, record, index, actions) => {
			return [
				<Button
					type='link'
					size='small'
					key='edit'
					onClick={() => {
						handleOpenForm();
					}}
				>
					edit
				</Button>,
				<Button type='link' size='small' key='delete'>
					delete
				</Button>,
			];
		},
	},
];
export default function BaseTable() {
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
			<PageHeaderWrap title='基础表格' />
			<ProTable columns={columns} dataSource={data} className='pt-20' />
			<FormModal formProps={{ labelCol: { span: 3 } }}>
				<ProFormInput label='name' name='name' />
				<ProFormInput label='age' name='age' />
				<ProFormInput label='content' name='content' />
			</FormModal>
		</div>
	);
}
