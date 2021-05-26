import { ProFormDatePicker, ProFormSelect } from "@/components/Pro/FormItem";
import { ProForm } from "@/components/Pro/Form";
import React from "react";
import TextOverFlow from "./TextOverFlow";
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
			<div className='h-10'></div>
			<TextOverFlow backgroundColor='#f0f2f5' animate>
				ask等哈就是暗杀计划的奥斯卡哈萨克计划静安寺阿萨就啊是多久啊是速度加速度和是的海景房士大夫士大夫撒旦飞洒地方扣税的法国士大夫士大夫十大
			</TextOverFlow>
		</div>
	);
}
