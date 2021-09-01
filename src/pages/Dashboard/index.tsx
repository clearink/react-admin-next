import { useCallback } from "react";
import { ProFormInput } from "@/components/Pro/FormItem";
import { ProTable } from "@/components/Pro/Table";
import { ProColumnsType } from "@/components/Pro/Table/ProTable/interface";
import http from "@/http";
import { sleep } from "@/utils/Test";
import useDrawerForm from "@/hooks/action/use-drawer-form";
import LinkButton from "@/components/Company/LinkButton";
// import "@/components/Pro/utils/merge-value";
interface Item {
	id: string | number;
	name: string;
	age: string;
	title: string;
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

// 重写 复制与省略的功能 现有的性能太差了
export default function DashBoard() {
	const [FormModal, handleOpen] = useDrawerForm(ComponentA);

	const columns: ProColumnsType<Item> = [
		{
			title: {
				title: "标题过长会收缩标题过长会收缩标题过长会收缩标题过长会收缩",
				tip: "标题过长会收缩",
			},
			dataIndex: "title",
			search: <ProFormInput required label="标题" />,
			// ellipsis: true,
			// copyable: true,
		},
		{
			title: "状态",
			dataIndex: "state",
			search: <ProFormInput label={false} />,
		},
		{
			title: "标签",
			dataIndex: "labels",
			search: <ProFormInput label={false} />,
			render: () => {
				return <div>123</div>;
			},
		},
		{
			title: "创建时间",
			dataIndex: "created_at",
			width: 200,
			sorter: true,
			search: <ProFormInput label={false} />,
		},
		{
			title: "action",
			key: "action",
			width: 300,
			render: (dom, record, index, action) => {
				return (
					<>
						<LinkButton
							onClick={() => {
								handleOpen();
							}}
						>
							open formA
						</LinkButton>
						<LinkButton>delete</LinkButton>
					</>
				);
			},
		},
	];

	const handleRequest = useCallback(async (params, filters, sorters) => {
		console.log("params,filters, sorters", params, filters, sorters);
		const result = await http.get("https://proapi.azurewebsites.net/github/issues", {
			current: params.current,
			pageSize: params.pageSize,
			sorter: sorters,
		});

		return { dataSource: result.data, total: result.total };
	}, []);
	return (
		<div>
			<ProTable
				columns={columns}
				tableTitle='高级表格'
				request={handleRequest}
				pagination={{ defaultPageSize: 5 }}
			/>
			<FormModal
				onCancel={async () => {
					console.log("onCancel");
					await sleep(1000);
					return true;
				}}
				title='测试 FormModalA'
			/>
			<button onClick={() => handleOpen()}>open</button>
		</div>
	);
}
