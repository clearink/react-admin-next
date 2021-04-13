import PageHeaderWrap from "@/components/PageHeaderWrap";
import InfiniteScroll from "./InfiniteScroll";

export default function ScrollLoadPage() {
	return (
		<div className='min-h-screen flex flex-col'>
			<PageHeaderWrap title='滚动加载组件' />
			<main className='bg-white mt-10 p-6 flex-1'>
				<InfiniteScroll>
          <div>1231211</div>
        </InfiniteScroll>
			</main>
		</div>
	);
}
