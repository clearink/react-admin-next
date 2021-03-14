import useRefCallback from "@/hooks/state/use-ref-callback";
import { Button } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Home(props: any) {
	return (
		<div className='flex flex-col h-full'>
			<div className='text-center text-3xl mb-4'>Home</div>
			<div className='text-center flex-1 text-2xl'>
				<p>封装的组件</p>
				<ul className='list-none'>
					<li className='line-through text-gray-500 mb-4'>
						<Link to='/table/edit-table'>可编辑Table</Link>
					</li>
					<li className='line-through text-gray-500 mb-4'>
						<Link to='/form/modal'>modalForm</Link>
					</li>
					<li className='line-through text-gray-500 mb-4'>
						<Link to='/form/drawer'>drawerForm</Link>
					</li>
					<li className='text-gray-500 mb-4'>
						<Link to='/form/step'>分布表单</Link>
					</li>
					<li className='text-gray-500'>
						<Link to='/form'>基础Form</Link>
					</li>
				</ul>
			</div>
		</div>
	);
}
