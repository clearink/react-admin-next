import createContainer from "@/utils/ContextUtils";

// 格式化 moment 日期
function useTimeFormat() {
	// const [timeFormat] = useState("YYYY/MM/DD");
	return "YYYY-MM-DD";
}
export const TimeFormatContext = createContainer(useTimeFormat);
