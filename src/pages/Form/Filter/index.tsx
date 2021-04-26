import PageHeaderWrap from "@/components/PageHeaderWrap";
import FilterForm from "@/components/Pro/Form/FilterForm";
import { Form, Input } from "antd";

export default function FilterFormPage() {
	return (
		<div>
			<PageHeaderWrap title='FilterForm' />
			<main>
				<FilterForm > 
				
					<Form.Item name='age'>
						<Input />
					</Form.Item>
					<Form.Item name='age'>
						<Input />
					</Form.Item>
					<Form.Item name='age'>
						<Input />
					</Form.Item>
					<Form.Item name='age'>
						<Input />
					</Form.Item>
					<Form.Item name='age'>
						<Input />
					</Form.Item>
					<Form.Item name='age'>
						<Input />
					</Form.Item>
					<Form.Item name='age'>
						<Input />
					</Form.Item>
					<Form.Item name='age'>
						<Input />
					</Form.Item>
					<Form.Item name='age'>
						<Input />
					</Form.Item>
				</FilterForm>
			</main>
		</div>
	);
}
