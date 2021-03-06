// 数组去重
export default function Unique<A = any>(array: Array<A>, by?: string) {
  if (by === undefined) return Array.from<A>(new Set(array));
  const map = new Map();
  for (let i = 0; i < array.length; i++) {
    const element = array[i];
    map.set(element[by], element);
  }
  return Array.from<A>(map.values());
}
