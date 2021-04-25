import { FormProps } from "antd";
import { SubmitterProps } from "../Submitter";
export interface ProFormProps<Values = any> extends FormProps<Values> {
	children?: React.ReactNode;
	submitConfig?: SubmitterProps | false;
	timeFormat?: string;
}
