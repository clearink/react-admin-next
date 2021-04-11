import React from "react";
import PageHeaderWrap from "@/components/PageHeaderWrap";
import DrawerForm from "@/components/Pro/Form/DrawerForm";
import styles from "./style.module.scss";
import { sleep } from "@/utils/Test";
import ProForm from "@/components/Pro/Form/ProForm";
import { Button, DatePicker, Input } from "antd";

export default function FormAdd(props: any) {
	return (
		<div className='flex flex-col min-h-screen'>
			<PageHeaderWrap title='drawer form' className={styles.page_header} />
			<main className='bg-white h-full flex-auto p-6'>
				<DrawerForm
          title={{title:'drawer form',tip:'drawer form'}}
					onFinish={async (values: any) => {
						await sleep(1000);
						console.log(values);
						return true;
					}}
					trigger={<Button>submit</Button>}
				>
					<ProForm.Item name='name'>
						<Input />
					</ProForm.Item>
					<ProForm.Item name='date'>
						<DatePicker />
					</ProForm.Item>
				</DrawerForm>
			</main>
		</div>
	);
}
