import React, { cloneElement } from "react";
import { DatePicker, Input } from "antd";
import PageHeaderWrap from "@/components/PageHeaderWrap";
import ProForm from "@/components/Pro/Form/ProForm";
import styles from "./style.module.scss";
import { sleep } from "@/utils/Test";

export default function FormPage(props: any) {
	return (
		<div className='flex flex-col min-h-full'>
			<PageHeaderWrap title='基础Form' className={styles.page_header} />
			<main className='bg-white flex-auto p-6'>
				<ProForm<{
					name:string;
					date:string
				}>
					onFinish={async (values) => {
						console.log(values);
						await sleep(1000);
					}}
					submitConfig={{
						render: (dom) => cloneElement(dom[1], { children: "提交表单" }),
					}}
				>
					<ProForm.Item name='name'>
						<Input />
					</ProForm.Item>
					<ProForm.Item name='date'>
						<DatePicker />
					</ProForm.Item>
				</ProForm>
			</main>
		</div>
	);
}
