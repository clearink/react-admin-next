import GetConstant from "./utils";

// 根据业务的不同定义不同的 type
interface I_ASSET_DETAIL {
	name: string,
	color: string,
	status: number,
	key: 'server' | 'endpoint' | 'net_endpoint' | 'safety_equipment'
}
const A = GetConstant<I_ASSET_DETAIL>(
	{ status: 1, name: '服务器', color: '13', key: 'server' }
)
	.extend({ default: 0, a: 213, c: '', d: [1, 2, 3, 4, 5] })
	.toArray(([k, v]) => ({ name: k, value: v.color, t: v.key }));

console.log(A.matchStatus(1))