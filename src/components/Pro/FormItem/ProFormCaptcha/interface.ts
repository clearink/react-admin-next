import { ButtonProps, InputProps } from "antd";
import { NamePath } from "antd/lib/form/interface";

export interface ProFormCaptchaProps extends InputProps {
	/** phone 的 name */
	phoneName: NamePath;
	onGetCaptcha?: (phoneValue: any) => Promise<boolean>;
	render?: (
		input: JSX.Element,
		trigger: JSX.Element,
		props: Omit<ProFormCaptchaProps, "render">
	) => JSX.Element;
	/** 倒计时总时间 */
	countDown?: number;
	trigger?: ButtonProps;
	/** ['获取验证码', '{}秒后重发'] */
	text?: ['string', string];
}
