import { InputProps } from "antd";
import { ProComponentRender } from "../../interface";

export interface ProFormInputProps extends InputProps {
	render?: ProComponentRender<ProFormInputProps>;
	value?: InputProps["value"];
}
