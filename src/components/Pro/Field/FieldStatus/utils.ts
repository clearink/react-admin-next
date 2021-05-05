function fillStrColor(str: string) {
	const noPrefix = str.replace(/#/, "").split("");
	if (noPrefix.length === 3) return noPrefix.map((item) => `0x${item}${item}`);
	// 转成 length = 3 的数组
	return noPrefix.reduce<string[]>((pre, cur, index, arr) => {
		if (index % 2) pre.push(`0x${arr[index - 1]}${cur}`);
		return pre;
	}, []);
}

export function gradientColor([start, end]: [string, string] = ["", ""], maxLevel = 2) {
	const reg = /^#([\da-fA-F]{3}|[\da-fA-F]{6})$/;

	if (!reg.test(start) || !reg.test(end)) return Array(maxLevel);

	const hexStart = fillStrColor(start).map((item) => parseInt(item, 16));
	const hexEnd = fillStrColor(end).map((item) => parseInt(item, 16));

	const ret: string[] = [`rgb(${hexStart[0]},${hexStart[1]},${hexStart[2]})`];

	for (let i = maxLevel - 2; i > 0; i--) {
		const r = Math.abs(~~((hexEnd[0] - hexStart[0]) / i) + hexStart[0]);
		const g = Math.abs(~~((hexEnd[1] - hexStart[1]) / i) + hexStart[1]);
		const b = Math.abs(~~((hexEnd[2] - hexStart[2]) / i) + hexStart[2]);
		ret.push(`rgb(${r},${g},${b})`);
	}

	ret.push(`rgb(${hexEnd[0]},${hexEnd[1]},${hexEnd[2]})`);
	
	return ret;
}
