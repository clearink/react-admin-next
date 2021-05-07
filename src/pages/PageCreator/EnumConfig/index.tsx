import PageHeaderWrap from "@/components/PageHeaderWrap";

export default function PageConfig() {
	return (
		<div className='flex flex-col h-full'>
			<PageHeaderWrap title='enum生成器' />
			<main className='bg-white mt-10 p-6 flex-1'></main>
		</div>
	);
}
