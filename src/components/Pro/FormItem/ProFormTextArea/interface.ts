import { TextAreaProps } from "antd/lib/input";
import { ProComponentRender } from "../../interface";

export interface ProFormTextAreaProps extends TextAreaProps{
  render?: ProComponentRender<ProFormTextAreaProps>;
	value?: TextAreaProps["value"];
}