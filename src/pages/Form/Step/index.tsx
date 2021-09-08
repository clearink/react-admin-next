import PageHeaderWrap from "@/components/PageHeaderWrap";
import { Input, InputNumber, Result } from "antd";
import StepsForm from "@/components/Pro/Form/StepsForm";
import { sleep } from "@/utils/Test";
import { ProFormInput } from "@/components/Pro/FormItem";
export default function StepFormPage() {
	return (
		<div className='flex flex-col min-h-full'>
			<PageHeaderWrap title='steps Form' />
			<main className='bg-white flex-auto p-6 mt-10'>
				<StepsForm
					onFinish={async (values, info) => {
						console.log(values, info);
						await sleep(1000);
						return true;
					}}
				>
					<StepsForm.Step name='ss1' title='第一步'>
						<ProFormInput name='name' />
					</StepsForm.Step>
					<StepsForm.Step name='ss2' title='第二步'>
						<ProFormInput name='name' />
					</StepsForm.Step>
					<StepsForm.Step name='ss3' title='第3步'>
						<StepsForm.Item name='age'>
							<InputNumber />
						</StepsForm.Item>
					</StepsForm.Step>
					<StepsForm.Step name='ss4' title='第4步'>
						<StepsForm.Item name='age'>
							<InputNumber />
						</StepsForm.Item>
					</StepsForm.Step>
					<StepsForm.Step name='ss5' title='完成'>
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
