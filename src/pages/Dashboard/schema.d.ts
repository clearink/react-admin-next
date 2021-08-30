// 生成器生成的配置 json 格式

import React, { ReactNode } from "react";

export interface CreatorSchema {
	key: React.Key;
	/** 列标题 */
	title?: ReactNode | { title: ReactNode; tip: ReactNode };
	/** 字段名 */
	dataIndex: React.Key | React.Key[];
	/** 筛选字段相应的配置 */
	search?: { component: string; config?: Record<string, any> };
	/** 显示字段相应的配置 */
	read?: { component: string; config?: Record<string, any> };
	/** vue 列 formatter 函数 */
	formatter?: string;
}
