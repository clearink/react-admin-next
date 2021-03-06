/**
 * 本地存储封装
 */
const store = window.localStorage;
const suffix = "_EXPIRES";

class LocalStore {
  static set(key: string, value: any, expires?: number) {
    try {
      store.setItem(key, JSON.stringify(value));
    } catch (err) {
      store.setItem(key, value);
    } finally {
      // expires存在 且不是NaN
      if (expires && !isNaN(expires)) {
        store.setItem(`${key}${suffix}`, `${expires + Date.now()}`);
      }
    }
  }

  // 首先需要确定是否有expires存在
  static get(key: string) {
    const result = store.getItem(key);
    const hasExpires = store.getItem(`${key}${suffix}`);
    const time = Number(hasExpires);
    // 如果存在 expires
    if (time && (isNaN(time) || time < Date.now())) {
      console.log(`${key} 已过期`);
      return LocalStore.remove(key);
    }
    try {
      return JSON.parse(result as string);
    } catch (err) {
      return result;
    }
  }

  static remove(key: string) {
    store.removeItem(key);
    store.removeItem(`${key}${suffix}`);
  }

  static clear() {
    store.clear();
  }
}

export default LocalStore;
