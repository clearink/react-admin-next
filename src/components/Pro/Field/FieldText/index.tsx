import { Typography } from "antd";
import { FieldTextProps } from "./interface";

export default function FieldText(props: FieldTextProps) {
	const { text, render, copyable, ...rest } = props;
	const DOM = (
		<Typography.Text
			children={text}
			{...rest}
			copyable={copyable ? { tooltips: false } : undefined}
		/>
	);
	if (render) return render(DOM, props);
	return DOM;
}
