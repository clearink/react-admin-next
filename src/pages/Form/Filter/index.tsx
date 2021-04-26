import PageHeaderWrap from "@/components/PageHeaderWrap";
import { FilterForm } from "@/components/Pro/Form";
import { Form, Input } from "antd";

export default function FilterFormPage() {
	return (
		<div>
			<PageHeaderWrap title='FilterForm' />
			<main>
				<FilterForm>
					<Form.Item name='123'>
						<Input />
					</Form.Item>
				</FilterForm>
			</main>
		</div>
	);
}
