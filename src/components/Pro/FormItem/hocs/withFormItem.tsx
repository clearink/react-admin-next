import React from "react";
import { Form } from "antd";
import { WithFormItemProps } from "../interface";
import { getProFormItemStyle, getRequiredRule } from "../utils";

// P 是例如 ProFormInputProps之类的类型
export default function withFormItem<P>(Field: React.ComponentType<P>, defaultProps?: Partial<P>) {
	return function FormItem(props: WithFormItemProps<P>) {
		const { width, field, ...rest } = props;

		/** 计算width */
		const [itemProps, itemWidth] = getProFormItemStyle(width);

		// 扩展一些基本的rules
		if (rest.required && rest.label) {
			const requiredRule = getRequiredRule(rest.label);
			if (rest.rules) rest.rules = rest.rules.concat(requiredRule);
			else rest.rules = requiredRule;
		}

		/** 解决 Field 报错的问题 */
		return (
			<Form.Item {...itemProps} {...rest} style={{ width: itemWidth, ...rest.style }}>
				<Field {...defaultProps} {...field!} />
			</Form.Item>
		);
	};
}

/**
 * 使用方法
 * withFormItem 直接继承了 Form.Item 的所有属性
 * eg:
 * <ProFormInput label="label" name="name"/>
 * 如若需要传递给 Input本身 则需要 使用 field 参数
 */
