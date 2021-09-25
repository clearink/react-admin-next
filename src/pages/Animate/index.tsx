import { FieldStatus } from "@/components/Pro/Field";
import useRequest from "@/components/Pro/hooks/use-request";
import http from "@/http";
import { useState } from "react";
import useSWR from "swr";

export default function AnimatePage() {
	const [a, setA] = useState(1);
	const { data } = useSWR('undefined', () =>
		http.get("https://proapi.azurewebsites.net/github/issues")
	);
	console.log(data);
	return (
		<div>
			21312
			<button onClick={() => setA((p) => p + 1)}>add</button>
			{/* <FieldStatus request={async()=>{
				await http.get
			}} /> */}
		</div>
	);
}
