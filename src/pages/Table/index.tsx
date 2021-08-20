import PageHeaderWrap from "@/components/PageHeaderWrap";
import { ModalForm } from "@/components/Pro/Form";
import { ModalFormRef } from "@/components/Pro/Form/ModalForm/interface";
import { ProFormInput } from "@/components/Pro/FormItem";
import { ProTable } from "@/components/Pro/Table";
import { ProColumnsType } from "@/components/Pro/Table/ProTable/interface";
import { Button, Space } from "antd";
import { useRef, useState } from "react";

interface Item {
	id: string | number;
	name: string;
	age: string;
	content: string;
}

export default function BaseTable() {
	const createRef = useRef<ModalFormRef>(null);
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
						key='edit'
						onClick={() => {
							createRef.current?.on();
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
	const [data, setData] = useState<Item[]>(() =>
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
			<ProTable columns={columns} dataSource={data} />
			<ModalForm<Item>
				ref={createRef}
				labelCol={{ span: 3 }}
				onFinish={async (values) => {
					console.log(values);
					return false;
				}}
			>
				<ProFormInput label='name' name='name' />
				<ProFormInput label='age' name='age' />
				<ProFormInput label='content' name='content' />
			</ModalForm>
		</div>
	);
}
