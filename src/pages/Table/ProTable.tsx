import { SEX_CONST } from "@/assets/constant/sex";
import PageHeaderWrap from "@/components/PageHeaderWrap";
import { FieldAvatar, FieldStatus, FieldText } from "@/components/Pro/Field";
import { ProFormInput, ProFormSelect } from "@/components/Pro/FormItem";
import { ProTable } from "@/components/Pro/Table";
import { ProColumnsType, ProTableRef } from "@/components/Pro/Table/ProTable/interface";
import useTitle from "@/hooks/ui/use-title";
import { GetNurseLevel, UserList } from "@/http/api/user";
import { useRef } from "react";

const columns: ProColumnsType<any> = [
	{
		title: "头像",
		dataIndex: "avatar",
		read: <FieldAvatar />,
	},
	{
		title: "id",
		dataIndex: "id",
		hideInTable: true,
		search: <ProFormInput label='' name='nameOrMobile' field={{ placeholder: "姓名/手机" }} />,
	},
	{
		title: "姓名",
		dataIndex: "name",
		read: <FieldText ellipsis copyable />,
		width: 100,
	},
	{
		title: "年龄",
		dataIndex: "age",
	},
	{
		title: "性别",
		dataIndex: "gender",
		read: <FieldStatus valueEnum={SEX_CONST.list} />,
	},
	{
		title: "联系电话",
		dataIndex: "mobile",
		read: <FieldText ellipsis copyable />,
	},
	{
		title: "职务",
		dataIndex: "position",
		read: (
			<FieldStatus
				type='tag'
				color={["#2c3e50", "#f39c12"]}
				params={GetNurseLevel.key}
				request={async () => {
					const { result } = await GetNurseLevel();
					return result.map((item: any) => ({ label: item.text, value: item.value }));
				}}
			/>
		),
	},
	{
		title: "账号状态",
		dataIndex: "enabled",
		read: (
			<FieldStatus
				valueEnum={[
					{ label: "正常", value: true },
					{ label: "禁止", value: false },
				]}
			/>
		),
		search: (
			<ProFormSelect
				name='as'
				label=''
				field={{
					valueEnum: [
						{ label: "正常", value: true },
						{ label: "禁止", value: false },
					],
				}}
			/>
		),
	},
];
export default function ProTablePage() {
	useTitle("增强表格");
	const tableRef = useRef<ProTableRef<any>>(null);
	return (
		<div className='min-h-full flex flex-col'>
			<PageHeaderWrap title='增强表格' />
			<main className='flex-auto bg-white mt-10'>
				<ProTable
					ref={tableRef}
					tableTitle={{ title: "护工管理", tip: "护工人员管理" }}
					columns={columns}
					request={async (params) => {
						const { current, ...rest } = params;
						const { result } = await UserList({
							pageNo: current,
							...rest,
						});
						return {
							dataSource: result.records,
							total: result.total,
						};
					}}
				/>
			</main>
		</div>
	);
}
