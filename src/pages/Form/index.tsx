import React from "react";
import PageHeaderWrap from "@/components/PageHeaderWrap";
import ProForm from "@/components/Pro/Form/ProForm";
import styles from "./style.module.scss";
import { sleep } from "@/utils/Test";
import { ProFormCaptcha, ProFormInput } from "@/components/Pro/FormItem";

export default function FormPage(props: any) {
	return (
		<div className='flex flex-col min-h-full'>
			<PageHeaderWrap title='基础Form' className={styles.page_header} />
			<main className='bg-white flex-auto p-6'>
				<ProForm<{
					name: string;
					age: string;
				}>
					onFinish={async (values) => {
						await sleep(1000);
					}}
				>
					<ProFormInput label='age' name='age' width='m' required />
					<ProFormCaptcha
						label='验证码'
						name='captcha'
						field={{
							phoneName: "age",
							onGetCaptcha: async (value) => {
								await sleep(1000);
								return true;
							},
						}}
					/>
				</ProForm>
			</main>
		</div>
	);
}
