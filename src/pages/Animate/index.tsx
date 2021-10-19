import { ProFormSelect } from "@/components/Pro/FormItem";
import http from "@/http";
import { useMemo, useState } from "react";
export default function AnimatePage() {
	const [a, setA] = useState(0);
	// const params = useMemo(() => , [a]);
	return (
		<div>
			21312
			<button
				onClick={() => {
					setA((p) => (p + 1) % 2);
				}}
			>
				add
			</button>
			<ProFormSelect
				placeholder='212121'
				params={["fetchIssueError", { current: a + 1, pageSize: 10 }]}
				request={async (key, params) => {
					const { data } = await http.get(`https://proapi.azurewebsites.net/github/issues`, params);
					return data?.map((item: any) => ({ label: item.title, value: item.id }));
				}}
			/>
		</div>
	);
}
