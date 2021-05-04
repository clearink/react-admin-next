import PageHeaderWrap from "@/components/PageHeaderWrap";
import { FilterForm } from "@/components/Pro/Form";
import { Form, Input, Checkbox } from "antd";

export default function FilterFormPage() {
	return (
		<div>
			<PageHeaderWrap title='FilterForm' />
			<main className='p-10 my-4 bg-white'>
				<Checkbox defaultChecked checked={undefined} onChange={console.log}>
					12312
				</Checkbox>
			</main>
			<main>
				<FilterForm defaultCollapsed collapsed={undefined} onCollapse={console.log}>
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
