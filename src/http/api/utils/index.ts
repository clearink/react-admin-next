/** 给 请求函数添加一个key 用于全局 mutate */
export function createFetcher<F extends Function>(key: string, fetcher: F) {
	fetcher.toString = function () {
		return key;
	};
	return Object.assign(fetcher, { key });
}