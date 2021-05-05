import React from "react";
import PageHeaderWrap from "@/components/PageHeaderWrap";
import styles from "./style.module.scss";
import { sleep } from "@/utils/Test";
import ProForm from "@/components/Pro/Form/ProForm";
import { Button, DatePicker, Input, Modal } from "antd";
import ModalForm from "@/components/Pro/Form/ModalForm";
import { useToggle } from "@/hooks/state/use-boolean";
export default function FormEdit(props: any) {
	const [visible, toggle] = useToggle();
	return (
		<div className='flex flex-col min-h-full'>
			<PageHeaderWrap title='modal form' className={styles.page_header} />
			<main className='bg-white flex-auto p-6'>
				<Modal visible={visible} onCancel={toggle}>
					<div>12332112</div>
				</Modal>
				<Button onClick={toggle}>toggle</Button>
				<ModalForm<{ name: string }>
					title={{ title: "modal form", tip: "modal form" }}
					onFinish={async (values) => {
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
				</ModalForm>
			</main>
		</div>
	);
}
