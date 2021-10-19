import { FieldStatus } from "@/components/Pro/Field";
import useRequest from "@/components/Pro/hooks/use-request";
import http from "@/http";
import { useState } from "react";
import useSWR from "swr";

export default function AnimatePage() {
	const { data } = useSWR("key", () =>
		http.get("http://localhost:4000/v2/pet/findByTags", {
			photoUrls: [1, 2, 3],
			name: 12,
			tags: [{ a: 1 }, { b: 3 }],
		})
	);
	console.log(data);
	return (
		<div>
			21312
			{/* <FieldStatus request={async()=>{
				await http.get
			}} /> */}
		</div>
	);
}
