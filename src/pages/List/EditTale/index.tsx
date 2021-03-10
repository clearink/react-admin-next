import PageHeaderWrap from "@/components/PageHeaderWrap";
import { Button, Modal } from "antd";
import styles from "./style.module.scss";
export default function EditTable() {
	return (
		<div className={styles.list_page_wrap}>
			<PageHeaderWrap title='可编辑表格' className={styles.page_title} />
			<main className='bg-white h-screen mt-8'>
				<Button
					onClick={() => {
						Modal.confirm({
							content: "12312",
						});
					}}
				>
					sssss
				</Button>
			</main>
		</div>
	);
}
