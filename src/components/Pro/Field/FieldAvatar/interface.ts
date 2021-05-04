import { AvatarProps } from "antd";
import { ProFieldProps } from "../interface";

export interface FieldAvatarProps extends AvatarProps, ProFieldProps<FieldAvatarProps> {
	text?: string;
}
