// export default function DashBoard() {
// 	console.log("render");
// 	const form = useMemo(() => createForm(), []);

// 	return (
// 		<div>
// 			<FormProvider form={form}>
// 				<FormLayout layout='vertical'>
// 					<Field
// 						name='input'
// 						title='输入'
// 						required
// 						initialValue='hello world'
// 						decorator={[FormItem]}
// 						component={[Input]}
// 					/>
// 				</FormLayout>
// 				<FormConsumer>{() => <span>{JSON.stringify(form.values)}</span>}</FormConsumer>
// 				<FormButtonGroup>
// 					<Submit onSubmit={console.log}>提交</Submit>
// 				</FormButtonGroup>
// 			</FormProvider>
// 		</div>
// 	);
// }

// const form = createForm({
// 	validateFirst: true,
// });

// export default function DashBoard() {
// 	return (
// 		<div>
// 			<Form form={form} layout='vertical' onAutoSubmit={console.log}>
// 				<Field
// 					name='phone'
// 					title='手机号'
// 					required
// 					validator='phone'
// 					decorator={[FormItem]}
// 					component={[Input, { prefix: <PhoneOutlined /> }]}
// 				/>
// 				<Submit block size='large'>
// 					登录
// 				</Submit>
// 			</Form>
// 		</div>
// 	);
// }

import { ProForm } from "@/components/Pro/Form";
import { ProFormInput } from "@/components/Pro/FormItem";
import { ProTable } from "@/components/Pro/Table";
import { ProColumnsType } from "@/components/Pro/Table/ProTable/interface";
import useModalForm from "@/hooks/action/use-modal-form";
import { useState } from "react";
import { Button } from "antd";
import { sleep } from "@/utils/Test";
// import "@/components/Pro/utils/merge-value";
interface Item {
	id: string | number;
	name: string;
	age: string;
	content: string;
}

function A(props: { a: number; c: string }) {
	console.log("props", props);
	return (
		<ProForm<Item>
			labelCol={{ span: 3 }}
			onFinish={async (values) => {
				console.log(values);
				return false;
			}}
		>
			<ProFormInput label='name' name='name' />
			<ProFormInput label='age' name='age' />
			<ProFormInput label='content' name='content' />
		</ProForm>
	);
}
export default function DashBoard() {
	const [FormAddModal, handleOpen] = useModalForm(A);
	const [a, setA] = useState(0);
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
							handleOpen({ c: record.content });
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
			<FormAddModal
				title='测试'
				onOk={async () => {
					await sleep(1000);
					return true;
				}}
			/>
			<button
				onClick={() => {
					setA(a + 1);
				}}
			>
				add--{a}
			</button>
			<button onClick={() => setA(a + 1)}>add</button>
		</div>
	);
}
