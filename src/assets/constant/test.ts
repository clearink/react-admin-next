import GetConstant, { ConstantItem } from "./utils";

interface I_ASSET_DETAIL extends ConstantItem {
	text: string;
	status: number;
	key: "server" | "net_endpoint" | "endpoint" | "safety_equipment";
	a: number;
}

export const ASSET_CONST = GetConstant<I_ASSET_DETAIL>(
	{ status: 1, text: "服务器1" },
	{ status: 2, text: "服务器2", key: "net_endpoint" },
	{ status: 3, text: "服务器3", key: "safety_equipment" },
	{ status: 4, text: "服务器4", key: "server" }
).setAll({ status: -1, text: "全部" });
console.log(ASSET_CONST.list);
console.log(ASSET_CONST.getFullList());
// ASSET_CONST.list
