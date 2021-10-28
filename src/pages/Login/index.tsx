import { phonePattern } from "@/configs/constant/pattern";
import { ProForm } from "@/components/Pro/Form";
import { ProFormCaptcha, ProFormInput } from "@/components/Pro/FormItem";
import { GetCaptcha, UserLogin } from "@/http/api/user";
import LoginUtil from "@/utils/LoginUtil";
import { cloneElement } from "react";
import "./style.module.scss";

export default function Login(props: any) {
	const handleSubmit = async (values: any) => {
		console.log(values);
		const { result } = await UserLogin({ ...values, type: "admin" });
		LoginUtil.setToken(result.token);
	};
	return (
		<ProForm
			onFinish={handleSubmit}
			className='w-1/2 flex flex-col'
			renderSubmitter={(dom) =>
				cloneElement(dom[1], { block: true, size: "large", children: "登录" })
			}
		>
			<ProFormInput
				name='mobile'
				rules={[
					{
						required: true,
						pattern: phonePattern,
						message: "手机号格式不正确",
					},
				]}
				field={{
					placeholder: "请输入手机号",
				}}
			/>

			<ProFormCaptcha
				name='captcha'
				rules={[{ required: true, message: "请输入验证码" }]}
				field={{
					phoneName: "mobile",
					placeholder: "请输入验证码",
					trigger: {
						style: { minWidth: 140 },
					},
					onGetCaptcha: async (mobile) => {
						await GetCaptcha({ mobile, type: "admin" });
						return true;
					},
				}}
			/>
		</ProForm>
	);
}
