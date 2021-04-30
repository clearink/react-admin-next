/** 获取受控属性的值 */
export default function getDumbValue<P extends object, N extends keyof P>(
	propName: N | N[],
	$props: P,
	props: Partial<P>
) {
	const list = ([] as N[]).concat(propName);
	for (let i = 0; i < list.length; i++) {
		const name = list[i];
		if ($props.hasOwnProperty(name)) {
			props[name] = $props[name];
		}
	}
}
