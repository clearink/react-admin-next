import { ProFormDatePicker, ProFormSelect } from "@/components/Pro/FormItem";
import { ProForm } from "@/components/Pro/Form";
import React from "react";
export default function DashBoard() {
	return (
		<div>
			<ProForm onFinish={console.log}>
				<ProFormDatePicker label='123' />
				<ProFormSelect
					name='as12'
					label=''
					field={{
						valueEnum: [
							{ label: "正常", value: true },
							{ label: "禁止", value: false },
						],
					}}
				/>
			</ProForm>
		</div>
	);
}
