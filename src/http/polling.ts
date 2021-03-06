/* 轮询工具
   cancel
   delay
   fn
*/
class Polling {
	private cancel = false

	private polling = false // 锁

	private fn: undefined | (() => void) = undefined

	private delay: number | undefined = undefined

	public retry = 4

	private sleep(delay: number) {
		return new Promise((resolve) => {
			setTimeout(resolve, delay)
		})
	}

	async poll(fn: () => void, delay: number) {
		// 已经取消 重试次数为0 正在轮询中 直接返回
		if (this.cancel || this.retry < 0 || this.polling) return
		this.fn = fn
		this.delay = delay
		this.polling = true
		await this.sleep(delay)
		try {
			await fn()
		} catch (error) {
			this.retry -= 1
		}
		this.polling = false
		await this.poll(fn, delay)
	}

	// 取消轮询
	abort() {
		this.cancel = true
	}

	// 重置
	reset() {
		this.cancel = false
		this.retry = 4
		if (this.fn !== undefined && this.delay !== undefined)
			this.poll(this.fn, this.delay)
	}
}
export default Polling
