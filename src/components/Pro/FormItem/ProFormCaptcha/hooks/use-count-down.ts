// 倒计时 hook

import { useEffect, useReducer, useRef } from "react";
import useRefCallback from "@/hooks/state/use-ref-callback";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

/**
 *
 * @param num 倒计时
 * @param interval 间隔
 */
const initialState = { count: 0, active: false, default: 0 };
const { actions, reducer } = createSlice({
	name: "use-count-down",
	initialState,
	reducers: {
		start(state) {
			if (!state.active) {
				state.count = Math.max(0, state.count - 1);
			}
			state.active = true;
		},
		reset(state, action: PayloadAction<number>) {
			return { active: false, count: action.payload, default: action.payload };
		},
		stop(state) {
			state.active = false;
		},
		step(state) {
			state.count -= 1;
		},
	},
});
// TODO: 倒计时结束 执行 onTarget
export interface useCountDownProps {
	num: number;
	interval?: number;
	onTarget?: () => void;
}
export default function useCountDown(props: useCountDownProps) {
	const { num, interval = 1000, onTarget } = props;
	const [{ count, active, default: defaultCount }, dispatch] = useReducer(reducer, {
		count: num,
		active: false,
		default: num,
	});

	useEffect(() => {
		if (num === defaultCount) return;
		dispatch(actions.reset(num)); // reset
	}, [num, defaultCount]);

	const timer = useRef(0);
	const handleStep = useRefCallback(() => {
		if (count < 1) {
			onTarget?.();
			clearInterval(timer.current);
			dispatch(actions.reset(num));
		} else dispatch(actions.step());
	});
	useEffect(() => {
		if (!active) return;
		timer.current = window.setInterval(handleStep, interval);
		return () => {
			clearInterval(timer.current);
		};
	}, [active, handleStep, interval]);

	const start = useRefCallback(() => {
		dispatch(actions.start());
	});
	const reset = useRefCallback((count: number) => {
		dispatch(actions.reset(count));
	});
	return [{ count, active }, start, reset] as const;
}
