import { ButtonProps, InputProps } from "antd";
import { NamePath } from "antd/lib/form/interface";
import { ProComponentRender } from "../../interface";

export interface ProFormCaptchaProps extends InputProps {
	/** phone 的 name */
	phoneName: NamePath;
	onGetCaptcha?: (phoneValue: any) => Promise<boolean>;
	/** dom:[input, trigger] */
	render?: ProComponentRender<ProFormCaptchaProps>;
	/** 倒计时总时间 */
	countDown?: number;
	trigger?: ButtonProps;
	/** ['获取验证码', '{}秒后重发'] */
	text?: ["string", string];
}
