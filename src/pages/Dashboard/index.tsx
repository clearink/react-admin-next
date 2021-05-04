import ProTable from "@/components/Pro/Table/ProTable";
import { FieldStatus, FieldText } from "@/components/Pro/Field";
import { ProColumnsType } from "@/components/Pro/Table/ProTable/interface";
import { SEX_CONST } from "@/assets/constant/sex";
import { GetNurseLevel } from "@/http/api/user";

const columns: ProColumnsType<any> = [
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
		read: <FieldText copyable />,
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
export default function DashBoard() {
	return (
		<div>
			<FieldStatus
				params='/sys/dict/getDictItems/careworkerPosition'
				request={async () => {
					const { result } = await GetNurseLevel();
					return result.map((item: any) => ({ label: item.text, value: item.value }));
				}}
			/>
			<ProTable
				dataSource={[
					{
						name: "匹小马匹小马匹",
						id: "121212",
						age: 11,
						gender: "male",
						mobile: "15927452136",
						position: "generalNurse",
					},
					{
						name: "匹小马匹小马匹",
						id: "1212",
						age: 11,
						gender: "female",
						mobile: "15927452136",
						position: "seniorNurse",
					},
				]}
				columns={columns}
			/>
		</div>
	);
}
/**
 * const [state,setState] = useState(false)
	const debounceValue= useDebounceValue(1000, state)
	return (
		<div>
			<Button onClick={() => {
				setState(!state)
			}}>toggle</Button>
			<div>debounceValue:{`${debounceValue}`}</div>

		</div>
	);
 */
