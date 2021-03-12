import useRefCallback from "@/hooks/state/use-ref-callback";
import { Button } from "antd";
import { useEffect, useState } from "react";

export default function Home(props: any) {
	const [state, setState] = useState(0);
	const fn = useRefCallback(() => {
		console.log(state);
	});
	useEffect(() => {
		console.log('fn()');
	}, [fn]);
  console.log('render');
	return (
		<div style={{ height: 3000 }}>
			<div>Home</div>
			<Button
				onClick={() => {
					setState(Math.random());
				}}
			>
				change
			</Button>
		</div>
	);
}
