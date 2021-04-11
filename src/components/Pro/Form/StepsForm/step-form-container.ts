import createContainer from "@/utils/ContextUtils";

function useStepForm(nextStep: () => void) {
	return nextStep;
}
export default createContainer(useStepForm);
