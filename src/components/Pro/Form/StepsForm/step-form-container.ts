import createContainer from "@/utils/ContextUtils";

interface UseStepFormProps {
	handlePreStep: () => void;
	handleNextStep: () => void;
}
function useStepForm(props: UseStepFormProps) {
	return props;
}
export const StepFormContainer = createContainer(useStepForm);
