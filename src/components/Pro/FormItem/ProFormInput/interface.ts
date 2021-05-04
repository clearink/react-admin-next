import { InputProps } from "antd";
import { ProFormItemRender } from "../interface";

export interface ProFormInputProps extends InputProps {
	render?: ProFormItemRender<ProFormInputProps>;
	value?: InputProps["value"];
}