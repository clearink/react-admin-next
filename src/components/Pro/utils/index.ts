// 检测 props 是否包含以下 属性
export function checkLocalData<T extends object, K extends keyof T>(props: T, ...attrs: K[]) {
	return attrs.some((item) => props.hasOwnProperty(item));
}
