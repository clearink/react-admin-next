
// 开发环境的log
export default function DevLog(...args: any[]) {
  if (process.env.NODE_ENV !== "production") console.log(...args);
}
