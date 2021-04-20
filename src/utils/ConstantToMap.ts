type ExtendFunction<Key = number, Value = string, Return = any> = (value: Map<Key, Value>, list: Array<[Key, Value]>) => Return

class ConstantToMapClass<K = number, V = string> {

    constructor(public map: Map<K, V>) {
    }

    // 属性扩展
    public extend<Return = any>(fn: ExtendFunction<K, V, Return>) {
        return fn(this.map, Array.from(this.map));
    }

    public match<Key extends K>(key: Key) {
        // 匹配 属性
        return this.map.get(key);
    }

    public concat<Key extends K, Value extends V>(key: Key, value: Value) {
        this.map.set(key, value);
        return this;
    }




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

export default function ConstantToMap<Key = number, Value = string>(...constantList: [Key, Value]) {
    if (constantList.length % 2) {
        console.error(`键值对无法匹配,请检查参数\n ${constantList}`);
    }

    // const map = new Map<Key, TMapValue<typeof constantList[1]>>();
    // for (let i = 0; i < constantList.length - 1; i += 2) {
    //     const key = constantList[i] as any;
    //     const value = constantList[i + 1] as any;
    //     map.set(key, value);
    // }
    return new ConstantToMapClass(new Map());
}
function ACTM<Key = number, Value = string>(key: Key, value: Value) {
    const map = new Map<Key, Partial<Value>>();
    map.set(key, value);
    return new ConstantToMapClass(map);
}
const a = ACTM(0, { text: '服务内', color: 'green', key: 'in' })
    .concat(1, { text: '服务内', color: 'green', key: 'in' })
    .concat(2, { text: '服务内', color: 'green', key: 'in' })
    .concat(3, { text: '服务内', color: 'green' });
const status = 1;
const d = a.match(0)?.text;
console.log(a)

/**
 * 需求
 * 1. 根据 status 映射 text done
 * 2. 根据 key 匹配 status pending
 * 3. 转换成list
 */
