function fillStrColor(str: string) {
	const noPrefix = str.replace(/#/, "").split("");
	if (noPrefix.length === 3) return noPrefix.map((item) => `0x${item}${item}`);
	// 转成 length = 3 的数组
	return noPrefix.reduce<string[]>((pre, cur, index, arr) => {
		if (index % 2) pre.push(`0x${arr[index - 1]}${cur}`);
		return pre;
	}, []);
}

export function gradientColor(colorRange: string[], maxLevel = 2) {
	const reg = /^#([\da-fA-F]{3}|[\da-fA-F]{6})$/;
	const len = colorRange.length;
	const start = colorRange[0];
	const end = colorRange[len - 1];

	if (len >= maxLevel || !reg.test(start) || !reg.test(end)) return colorRange;

	const hexStart = fillStrColor(start).map((item) => parseInt(item, 16));
	const hexEnd = fillStrColor(end).map((item) => parseInt(item, 16));

	const ret: string[] = [];
	const max = Math.max(2, maxLevel);
	for (let i = 0; i < maxLevel; i++) {
		const $r = ((hexEnd[0] - hexStart[0]) * i) / (max - 1);
		const r = Math.abs(~~$r + hexStart[0]);

		const $g = ((hexEnd[1] - hexStart[1]) * i) / (max - 1);
		const g = Math.abs(~~$g + hexStart[1]);

		const $b = ((hexEnd[2] - hexStart[2]) * i) / (max - 1);
		const b = Math.abs(~~$b + hexStart[2]);

		ret.push(`rgb(${r},${g},${b})`);
	}

	return ret;
}
