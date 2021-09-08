import React from "react";
import PageHeaderWrap from "@/components/PageHeaderWrap";
import styles from "./style.module.scss";
import { sleep } from "@/utils/Test";
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
						return true;
					}}
					trigger={<Button>submit</Button>}
				>
					<ModalForm.Item name='name'>
						<Input />
					</ModalForm.Item>
					<ModalForm.Item name='date'>
						<DatePicker />
					</ModalForm.Item>
				</ModalForm>
			</main>
		</div>
	);
}
