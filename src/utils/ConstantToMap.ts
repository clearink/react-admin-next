type ExtendFunction<Key = number, Value = string, Return = any> = (value: Map<Key, Value>, list: Array<[Key, Value]>) => Return

class ConstantToMapClass<K = number, V = string> {
    constructor(public map: Map<K, V>) { }

    public extend<Return = any>(fn: ExtendFunction<K, V, Return>) {
        return fn(this.map, Array.from(this.map));
    }
    // 生成的对象


}

/** 转换成对象数组 */
export function ConvertObjectArray(list: Array<any[]>, ...nameList: string[]) {
    if (list.length !== 0 && nameList.length !== list[0].length) {
        console.error(`无法正确转换成对象数组,请检查参数:\n ${list}`);
    }
    return list.map((itemArr) => itemArr.reduce((pre, cur, index) =>
        ({ ...pre, [nameList[index]]: cur })
        , {}),
    );
}


/** 根据参数转换成map 获得正确的数据顺序与类型 */

export default function ConstantToMap<Key = number, Value = string>(...constantList: any[]) {
    if (constantList.length % 2) {
        console.error(`键值对无法匹配,请检查参数\n ${constantList}`);
    }
    const map = new Map<Key, Value>();
    for (let i = 0; i < constantList.length - 1; i += 2) {
        const key = constantList[i];
        const value = constantList[i + 1];
        map.set(key, value);
    }
    return new ConstantToMapClass(map);
}