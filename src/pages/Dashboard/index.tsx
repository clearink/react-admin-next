import { GetNurseLevel } from "@/http/api/user";
import { ProFormSelect } from "@/components/Pro/FormItem";
import { Button } from "antd";
import { ProForm } from "@/components/Pro/Form";
import { mutate } from "swr";

export default function DashBoard() {

	return (
		<div>
			<ProForm onFinish={console.log}>
				<ProFormSelect
					name='sex'
					label='性别'
					field={{
						valueEnum: [
							{ label: "男", value: "male" },
							{ label: "女", value: "female" },
						],
					}}
				/>
				<ProFormSelect
					name='level'
					label='职务'
					field={{
						params: GetNurseLevel.key,
						request: async () => {
							const { result } = await GetNurseLevel();
							const ret = (result as any[]).map((item: any) => ({
								label: item.text,
								value: item.value,
							}));
							return ret;
						},
					}}
				/>
			</ProForm>
			<Button
				className='mt-5'
				onClick={() => {
					console.log(`mutate--- ${GetNurseLevel.key}`);
					mutate(GetNurseLevel.key);
				}}
			>
				mutate
			</Button>
		</div>
	);
}
