import createContainer from "@/utils/ContextUtils";

function useTimeFormat() {
	// const [timeFormat] = useState("YYYY/MM/DD");
	return "YYYY-MM-DD";
}
export const TimeFormatContext = createContainer(useTimeFormat);
