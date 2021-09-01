import { Button, ButtonProps } from "antd";
import withDefaultProps from "@/hocs/withDefaultProps";

// 链接样式的 button
function LinkButton(props: ButtonProps) {
	return <Button {...props} />;
}
export default withDefaultProps(LinkButton, { type: "link", size: "small" });
