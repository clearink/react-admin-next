import createContainer from "@/utils/ContextUtils";
import { ButtonProps, FormInstance } from "antd";

function useProForm(props: { loading: ButtonProps["loading"]; form: FormInstance }) {
	return props;
}
export const ProFormContainer = createContainer(useProForm);
