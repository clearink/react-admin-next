import { FormInstance } from "antd";
import { NamePath } from "antd/lib/form/interface";

// 处理 dataIndex 为数组的情形

// 同样是模仿lodash的get/set
export function getFormValue(form: FormInstance, name: NamePath) {}

export function setFormValue(form: FormInstance, name: NamePath, value: any) {}
