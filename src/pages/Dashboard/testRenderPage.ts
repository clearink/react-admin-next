import { FieldStatusProps } from "@/components/Pro/Field/FieldStatus/interface";
import { FieldTextProps } from "@/components/Pro/Field/FieldText/interface";
import ejs from "ejs";
import { CreatorSchema } from "./schema";
import template from "./template";

const schema: CreatorSchema[] = [
	{
		key: "1",
		title: "标题",
		dataIndex: ["title", "c"],
		search: {
			component: "ProFormInput",
			config: { placeholder: "请输入标题进行查询", valueEnum: [1, 2, 3] },
		},
		read: { component: "FieldStatus" },
	},
];

// 渲染 筛选组件
function renderSearch(schema: {
	component: keyof ReadComponentMap;
	config?: Partial<ReadComponentMap[keyof ReadComponentMap]>;
}) {
	const props = Object.entries(schema.config ?? {}).map(
		([key, value]) => `${key}={${JSON.stringify(value)}}`
	);

	return `<${schema.component} ${props.join(" ")} />`;
}

// 渲染显示组件
function renderRead(schema: { component: string; config: Record<string, any> }) {
	return `<FieldStatus />`;
}
(async () => {
	const result = await ejs.render(
		template,
		{
			name: "TestRender",
			tableTitle: "测试自动生成页面",
			schema,
			renderSearch,
			renderRead,
		},
		{ async: true }
	);
	console.log(result);
})();

export interface ReadComponentMap {
	FieldText: FieldTextProps;
	FieldStatus: FieldStatusProps;
}
