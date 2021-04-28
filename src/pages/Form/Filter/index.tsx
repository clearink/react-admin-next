import PageHeaderWrap from "@/components/PageHeaderWrap";
import { FilterForm } from "@/components/Pro/Form";
import { sleep } from "@/utils/Test";
import { Form, Input, Checkbox, Space } from "antd";

export default function FilterFormPage() {
	return (
		<div>
			<PageHeaderWrap title='FilterForm' />
			<main className='p-10 my-4 bg-white'>
				<Checkbox defaultChecked onChange={console.log}>
					12312
				</Checkbox>
			</main>
			<main>
				<FilterForm>
					<Form.Item name='123' label='12321'>
						<Input />
					</Form.Item>
					<Form.Item name='123' label='12321'>
						<Input />
					</Form.Item>
					<Form.Item name='123' label='12321'>
						<Input />
					</Form.Item>
				</FilterForm>
			</main>
		</div>
	);
}
