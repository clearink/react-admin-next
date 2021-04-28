import { useDebounceState } from "@/hooks/state/use-debounce";
import { sleep } from "@/utils/Test";
import { Button } from "antd";

export default function DashBoard() {
	const [debounceState, setState] = useDebounceState(150, false);
	console.log("render");
	return (
		<div>
			<Button
				onClick={async () => {
					setState(true);
					await sleep(160);
					setState(false);
				}}
			>
				toggle
			</Button>
			<div>debounceState:{`${debounceState}`}</div>
		</div>
	);
}
/**
 * const [state,setState] = useState(false)
	const debounceValue= useDebounceValue(1000, state)
	return (
		<div>
			<Button onClick={() => {
				setState(!state)
			}}>toggle</Button>
			<div>debounceValue:{`${debounceValue}`}</div>

		</div>
	);
 */
