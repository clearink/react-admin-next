// 用于处理编辑模式下的错误提示的发布订阅模式
class ErrorEventBus {
	// 存放订阅的事件
	private eventMap: Map<string, Function[]>;
	constructor() {
		this.eventMap = new Map();
	}

	// 添加订阅事件
	public on(type: string, event: Function) {
		if (!this.eventMap.has(type)) {
			// 没有该类型的事件
			this.eventMap.set(type, [event]);
		} else {
			const eventList = this.eventMap.get(type)!;
			this.eventMap.set(type, eventList?.concat(event));
		}
		return this;
	}
	// 发布事件
	public emit<T extends any = any>(type: string, ...params: T[]) {
		if (!this.eventMap.has(type)) return;
		const eventList = this.eventMap.get(type)!;
		for (let event of eventList) {
			event(...params);
		}
		return this;
	}

	// 删除事件
	public off(type: string, event: Function) {
		if (!this.eventMap.has(type)) return;
		const errorList = this.eventMap.get(type)!.filter((cb) => cb !== event);
		this.eventMap.set(type, errorList);
		return this;
	}

	// 是否有该类型的事件
	public has(type: string) {
		const eventList = this.eventMap.get(type) ?? [];
		return eventList.length > 0;
	}
}
export default new ErrorEventBus();
