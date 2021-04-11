import React from "react";
import PageHeaderWrap from "@/components/PageHeaderWrap";
import { Input, InputNumber, Result, Steps } from "antd";
import StepsForm from "@/components/Pro/Form/StepsForm";
import { sleep } from "@/utils/Test";
export default function StepFormPage() {
	return (
		<div className='flex flex-col min-h-screen'>
			<PageHeaderWrap title='steps Form' />
			<main className='bg-white h-full flex-auto p-6'>
				<StepsForm onFinish={console.log} withFormName>
					<StepsForm.Step name='ss1' onFinish={() => true} isLast>
						<StepsForm.Item name='name'>
							<Input />
						</StepsForm.Item>
					</StepsForm.Step>
					<StepsForm.Step
						name='ss2'
						onFinish={(v) => {
							console.log("await ", v);
							return true;
						}}
					>
						<StepsForm.Item name='age'>
							<InputNumber />
						</StepsForm.Item>
					</StepsForm.Step>
					{/* <StepsForm.Step name='ss3'>
						<Result status='success' />
					</StepsForm.Step> */}
				</StepsForm>
			</main>
		</div>
	);
}
/**
 * 	<Steps>
					<Steps.Step title='step1' subTitle='subtitle1' description='description1'></Steps.Step>
					<Steps.Step title='step2' subTitle='subtitle2' description='description2'></Steps.Step>
				</Steps>
 */
