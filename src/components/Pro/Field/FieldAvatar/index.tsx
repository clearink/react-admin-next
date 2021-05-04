import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { FieldAvatarProps } from "./interface";
/**
 * TODO: 能否处理树形结构的值呢?
 * 即 valueEnum 是 tree
 */
function FieldAvatar(props: FieldAvatarProps) {
	const { text, render, ...rest } = props;

	const DOM = <Avatar shape='circle' size={32} src={text} icon={<UserOutlined />} {...rest} />;
	if (render) return render(DOM, props);
	return DOM;
}
export default FieldAvatar;
