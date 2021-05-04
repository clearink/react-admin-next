import { SEX_CONST } from "@/assets/constant/sex";
import PageHeaderWrap from "@/components/PageHeaderWrap";
import { FieldAvatar, FieldStatus, FieldText } from "@/components/Pro/Field";
import { ProFormInput } from "@/components/Pro/FormItem";
import ProTable from "@/components/Pro/Table/ProTable";
import { ProColumnsType } from "@/components/Pro/Table/ProTable/interface";
import useTitle from "@/hooks/ui/use-title";
import { GetNurseLevel, UserList } from "@/http/api/user";
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
		title: "住户手机",
		dataIndex: "mobile",
		read: <FieldText ellipsis copyable />,
	},
	{
		title: "职务",
		dataIndex: "position",
		read: (
			<FieldStatus
				params='/sys/dict/getDictItems/careworkerPosition'
				request={async () => {
					const { result } = await GetNurseLevel();
					return result.map((item: any) => ({ label: item.text, value: item.value }));
				}}
			/>
		),
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
					onCreate={() => {
						console.log("create");
					}}
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
