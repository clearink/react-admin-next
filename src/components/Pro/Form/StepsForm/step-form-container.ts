import createContainer from "@/utils/ContextUtils";
import { ButtonProps } from "antd";

interface UseStepFormProps {
	loading: ButtonProps["loading"];
	handlePreStep: () => void;
	handleNextStep: () => void;
}
function useStepForm(props: UseStepFormProps) {
	return props;
}
export const StepFormContainer = createContainer(useStepForm);
