import { ProFormSelect } from "@/components/Pro/FormItem";
import http from "@/http";
import { mutate } from "swr";
import { useMemo, useState } from "react";
export default function AnimatePage() {
	const setA = useState(0)[1];
	const params = useMemo(() => ["fetchIssueError", { current: 1, pageSize: 10 }], []);
	return (
		<div>
			21312
			<button
				onClick={() => {
					setA((p) => p + 1);
					mutate(params);
				}}
			>
				add
			</button>
			<ProFormSelect
				placeholder='212121'
				params={params}
				request={async (key, params) => {
					const { data } = await http.get(`https://proapi.azurewebsites.net/github/issues`, params);
					return data?.map((item: any) => ({ label: item.title, value: item.id }));
				}}
			/>
		</div>
	);
}
