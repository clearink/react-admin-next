import { TextProps } from "antd/lib/typography/Text";
import { ProFieldProps } from "../interface";

export interface FieldTextProps extends TextProps, ProFieldProps<FieldTextProps> {
	text?: TextProps["children"];
}
