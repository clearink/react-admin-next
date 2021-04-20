import React from "react";
import PageHeaderWrap from "@/components/PageHeaderWrap";
import VirtualList from './VirtualList'
export default function VirtualListPage() {
    return <div className='flex flex-col h-full'>
        <PageHeaderWrap title='虚拟列表' />
        <main className='bg-white mt-10 p-6 flex-1'>
            <VirtualList data={[]} />
        </main>
    </div>
}