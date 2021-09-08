import React from "react";
import PageHeaderWrap from "@/components/PageHeaderWrap";
import styles from "./style.module.scss";
import { sleep } from "@/utils/Test";
import { Button, DatePicker, Input } from "antd";
import { DrawerForm } from "@/components/Pro/Form";

export default function FormAdd(props: any) {
	return (
		<div className='flex flex-col min-h-full'>
			<PageHeaderWrap title='drawer form' className={styles.page_header} />
			<main className='bg-white flex-auto p-6'>
				<DrawerForm
					title={{ title: "drawer form", tip: "drawer form" }}
					onFinish={async (values) => {
						await sleep(1000);
						return true;
					}}
					trigger={<Button>submit</Button>}
				>
					<DrawerForm.Item name='name'>
						<Input />
					</DrawerForm.Item>
					<DrawerForm.Item name='date'>
						<DatePicker />
					</DrawerForm.Item>
				</DrawerForm>
			</main>
		</div>
	);
}
