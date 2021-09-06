import { Key } from "react";

// 用于处理编辑模式下的错误提示的发布订阅模式
class ErrorEventBus {
	// 存放订阅的事件
	private eventMap: Map<string, Function[]>;
	constructor() {
		this.eventMap = new Map();
	}

	// 添加订阅事件
	public on(type: Key | Key[], event: Function) {
		const eventType = ([] as Key[]).concat(type).toString();
		if (!this.eventMap.has(eventType)) {
			// 没有该类型的事件
			this.eventMap.set(eventType, [event]);
		} else {
			const eventList = this.eventMap.get(eventType)!;
			this.eventMap.set(eventType, eventList?.concat(event));
		}
		return this;
	}
	// 发布事件
	public emit<T extends any = any>(type: Key | Key[], ...params: T[]) {
		const eventType = ([] as Key[]).concat(type).toString();
		if (!this.eventMap.has(eventType)) return;
		const eventList = this.eventMap.get(eventType)!;
		for (let event of eventList) {
			event(...params);
		}
		return this;
	}

	// 删除事件
	public off(type: Key | Key[], event: Function) {
		const eventType = ([] as Key[]).concat(type).toString();
		if (!this.eventMap.has(eventType)) return;
		const errorList = this.eventMap.get(eventType)!.filter((cb) => cb !== event);
		this.eventMap.set(eventType, errorList);
		return this;
	}

	// 是否有该类型的事件
	public has(type: Key | Key[]) {
		const eventType = ([] as Key[]).concat(type).toString();
		const eventList = this.eventMap.get(eventType) ?? [];
		return eventList.length > 0;
	}
}
export default new ErrorEventBus();
