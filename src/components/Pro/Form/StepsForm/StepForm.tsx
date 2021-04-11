import ProForm from "@/components/Pro/Form/ProForm";
import useRefCallback from "@/hooks/state/use-ref-callback";
import { StepFormProps } from "./interface";
import StepFormContainer from "./step-form-container";

function StepForm(props: StepFormProps) {
	const { onFinish, children, isLast, ...rest } = props;
	const handleNextStep = StepFormContainer.useContainer();
	const handleFinish = useRefCallback(async (values) => {
		const isNext = await onFinish?.(values);
		if (isNext && !isLast) handleNextStep?.();
	});
	return (
		<ProForm {...rest} onFinish={handleFinish}>
			{children}
		</ProForm>
	);
}

StepForm.StepForm = true;
StepForm.defaultProps = {
	isLast: false,
};
export default StepForm;
