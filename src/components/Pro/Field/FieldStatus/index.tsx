import { cloneElement } from "react";
import { Badge, Tag } from "antd";
import useRequest from "../../hooks/use-request";
import useGetStatus from "./hooks/use-get-status";
import { FieldStatusProps } from "./interface";
/**
 * 如何根据valueEnum 计算出 label
 * TODO: 能否处理树形结构的值呢?
 * 即 valueEnum 是 tree
 */
function FieldStatus(props: FieldStatusProps) {
	const {
		text,
		render,
		valueEnum: $valueEnum,
		type,
		request,
		params,
		color: $color,
		...rest
	} = props;

	const useProp = props.hasOwnProperty("valueEnum");
	const { data: _valueEnum } = useRequest(params, request, useProp);
	const valueEnum = useProp ? $valueEnum : _valueEnum;

	const { color, label } = useGetStatus(text, valueEnum, ([] as any[]).concat($color));

	let DOM = <></>;
	if (type === "tag") DOM = <Tag color={color} children={label} />;
	else DOM = <Badge color={color ?? "#d9d9d9"} text={label} />;

	DOM = cloneElement(DOM, rest);
	if (render) return render(DOM, props);
	return DOM;
}
export default FieldStatus;
