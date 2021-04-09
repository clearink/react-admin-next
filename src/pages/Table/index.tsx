import PageHeaderWrap from "@/components/PageHeaderWrap";
import { useToggle } from "@/hooks/state/use-boolean";
import { Button, Modal } from "antd";

export default function BaseTable() {
	const [visible, toggle] = useToggle();
	return (
		<div>
			<PageHeaderWrap title='基础表格' />
			<div className='text-right'><Button onClick={toggle}>toggle</Button></div>
			<Modal visible={visible} onCancel={toggle} ></Modal>
			<main className='h-screen'></main>
		</div>
	);
}
