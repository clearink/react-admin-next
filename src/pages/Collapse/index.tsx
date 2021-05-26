import React from "react";
import PageHeaderWrap from "@/components/PageHeaderWrap";
import Collapse from "./Collapse";

export default function CollapsePage() {
	return (
		<div className='min-h-full flex flex-col'>
			<PageHeaderWrap title='折叠面板' />
			<main className='bg-white mt-10 p-6 flex-1'>
				<Collapse header={<div>header</div>}>
					<div>21222222222222</div>
					<div>21222222222222</div>
					<div>21222222222222</div>
					<div>21222222222222</div>
					<div>21222222222222</div>
					<div>21222222222222</div>
					<div>21222222222222</div>
					<div>21222222222222</div>
					<div>21222222222222</div>
					<div>21222222222222</div>
					<div>21222222222222</div>
					<div>21222222222222</div>
					<div>21222222222222</div>
					<div>21222222222222</div>
					<div>21222222222222</div>
					<div>21222222222222</div>
					<div>21222222222222</div>
					<div>21222222222222</div>
					<div>21222222222222</div>
					<div>21222222222222</div>
					<div>21222222222222</div>
					<div>21222222222222</div>
					<div>21222222222222</div>
				</Collapse>
			</main>
		</div>
	);
}
