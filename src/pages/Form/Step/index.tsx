import PageHeaderWrap from "@/components/PageHeaderWrap";
import { Input, InputNumber, Result } from "antd";
import StepsForm from "@/components/Pro/Form/StepsForm";
import { sleep } from "@/utils/Test";
export default function StepFormPage() {
	return (
		<div className='flex flex-col min-h-full'>
			<PageHeaderWrap title='steps Form' />
			<main className='bg-white flex-auto p-6 mt-10'>
				<StepsForm
					onFinish={async (values, info) => {
						await sleep(1000);
						return true;
					}}
				>
					<StepsForm.Step
						name='ss1'
						stepProps={{
							title: "第一步",
						}}
					>
						<StepsForm.Item name='name'>
							<Input />
						</StepsForm.Item>
					</StepsForm.Step>
					<StepsForm.Step
						name='ss2'
						stepProps={{
							title: "第二步",
						}}
					>
						<StepsForm.Item name='age'>
							<InputNumber />
						</StepsForm.Item>
					</StepsForm.Step>
					<StepsForm.Step name='ss3'>
						<StepsForm.Item name='age'>
							<InputNumber />
						</StepsForm.Item>
					</StepsForm.Step>
					<StepsForm.Step name='ss4'>
						<StepsForm.Item name='age'>
							<InputNumber />
						</StepsForm.Item>
					</StepsForm.Step>
					<StepsForm.Step name='ss5'>
						<Result status='success' />
					</StepsForm.Step>
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
