import React, { useState } from "react";
import PageHeaderWrap from "@/components/PageHeaderWrap";
import InfiniteScroll from "@/components/Pro/InfiniteScroll";
import { sleep } from "@/utils/Test";

export default function ScrollLoadPage() {
	const [len, setLen] = useState(60);
	return (
		<div className='min-h-full flex flex-col'>
			<PageHeaderWrap title='无限滚动' />
			<main className='bg-white mt-10 p-6 flex-1'>
				<InfiniteScroll
					hasMore
					height={400}
					loadMore={async () => {
						console.log("请求接口");
						await sleep(200);
						setLen((p) => p + 10);
						return true;
					}}
					loader={<div>loading....</div>}
				>
					{Array.from({ length: len }, (_, i) => {
						return (
							<div className='h-8' key={i}>
								{i}
							</div>
						);
					})}
				</InfiniteScroll>
			</main>
		</div>
	);
}
