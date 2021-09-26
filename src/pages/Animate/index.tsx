import { ProFormSelect } from "@/components/Pro/FormItem";
import http from "@/http";
import { mutate } from "swr";
export default function AnimatePage() {
	return (
		<div>
			21312
			<button
				onClick={() => {
					mutate("fetchIssueError");
				}}
			>
				add
			</button>
			<ProFormSelect
				placeholder='212121'
				params='fetchIssueError'
				request={async () => {
					const { data } = await http.get("https://proapi.azurewebsites.net/github/issues");
					return data?.map((item: any) => ({ label: item.title, value: item.id }));
				}}
			/>
		</div>
	);
}
