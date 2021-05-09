import { SwitchProps } from "antd";
import { ProComponentRender } from "../../interface";

export interface ProFormSwitchProps extends SwitchProps {
	render?: ProComponentRender<ProFormSwitchProps>;
	value?: SwitchProps["checked"];
}
