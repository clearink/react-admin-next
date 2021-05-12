import { GetNurseLevel } from "@/http/api/user";
import { ProFormSelect } from "@/components/Pro/FormItem";
import { Button } from "antd";
import { ProForm } from "@/components/Pro/Form";
import { useState } from "react";
import usePrevious from "@/hooks/state/use-previous"

export default function DashBoard() {
	const [a, b] = useState(0);
	const prevA = usePrevious(a);
	console.log("now prev", a, prevA);
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
					name='status'
					width='m'
					label='状态'
					field={{
						valueEnum: [
							{ label: "正常", value: true },
							{ label: "禁止", value: false },
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
					b((p) => p + 1);
				}}
			>
				change
			</Button>
		</div>
	);
}
