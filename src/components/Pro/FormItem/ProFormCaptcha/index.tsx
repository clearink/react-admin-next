import React, { useState } from "react";

import classNames from "classnames";
import { Button, Input } from "antd";
import { ButtonProps } from "antd/lib/button";
import useCountDown from "./hooks/use-count-down";
import { ProFormContainer } from "../../Form/ProForm/utils";
import withFormItem from "../hocs/withFormItem";
import useRefCallback from "@/hooks/state/use-ref-callback";
import { ProFormCaptchaProps } from "./interface";
import styles from "./style.module.scss";

/* 验证码封装组件
ProFormCaptcha
*/

function ProFormCaptcha(props: ProFormCaptchaProps) {
	const { phoneName, onGetCaptcha, render, countDown, trigger, text, ...rest } = props;

	const [{ count, active }, start] = useCountDown({
		num: countDown ?? 60,
	});

	const [loading, setLoading] = useState<ButtonProps["loading"]>(false);
	const { form } = ProFormContainer.useContainer();
	const handleClick = useRefCallback(async () => {
		if (typeof onGetCaptcha !== "function" || active) return;
		try {
			setLoading({ delay: 100 });
			// 检测是否输入了手机号
			await form?.validateFields([phoneName]);
			const phoneValue = form!.getFieldValue(phoneName);
			const result = await onGetCaptcha(phoneValue);
			if (result) start();
		} finally {
			setLoading(false);
		}
	});
	const renderText = () => {
		const [customText = "获取验证码", activeText = "{}秒后重发"] = text ?? [];
		if (active) return activeText.replace(/{.*?}/g, `${count}`);
		return customText;
	};
	return (
		<div className={styles.captcha_wrap}>
			<Input {...rest} className={classNames(styles.input, rest.className)} />
			{/* 获取验证码的 */}
			<Button
				size={rest.size}
				{...trigger}
				loading={loading}
				disabled={active}
				onClick={handleClick}
				className={classNames(styles.trigger, trigger?.className)}
			>
				{renderText()}
			</Button>
		</div>
	);
}

export default withFormItem(ProFormCaptcha);
