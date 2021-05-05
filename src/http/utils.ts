/** 给 请求函数添加一个key 用于全局 mutate */
export function createFetcher<F extends Function>(key: string, fetcher: F) {
	fetcher.toString = function () {
		return key;
	};

	return Object.assign(fetcher, { key });
}

/**
 * 返回什么呢?
 * 1. valueOf 是 fetcher
 * 2. toString 和 ret.name 是 url
 * */
