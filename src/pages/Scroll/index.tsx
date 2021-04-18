import PageHeaderWrap from "@/components/PageHeaderWrap";
import { sleep } from "@/utils/Test";
import { useState } from "react";
import InfiniteScroll from "./InfiniteScroll";

export default function ScrollLoadPage() {
	const [len, setLen] = useState(60);
	return (
		<div className='min-h-screen flex flex-col'>
			<PageHeaderWrap title='滚动加载组件' />
			<main className='bg-white mt-10 p-6 flex-1'>
				<InfiniteScroll
					hasMore={true}
					height={400}
					loadMore={async () => {
						console.log('请求接口');
						await sleep(Math.random()*200);
						setLen((p) => p + 10);
						return true;
					}}
					loader={<div>loading....</div>}
				>
					{Array.from({ length: len }, (_, i, ...args) => {
						return (
							<div className='h-8' key={i}>
								{i}
							</div>
						);
					})}
					<div
						style={{
							height: 1,
							borderBottom: "1px solid red",
						}}
					></div>
				</InfiniteScroll>
			</main>
		</div>
	);
}
