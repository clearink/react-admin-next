// 短横线 转 驼峰
export function kebabToCamel(str: string) {
	return str.replace(/(-\w)/g, (match) => match[1].toUpperCase());
}
