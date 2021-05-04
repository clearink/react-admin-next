import configs from "@/configs";
import { isArray } from "@/utils/ValidateType";
export const COLOR_ENUM = isArray(configs.COLOR_ENUM)
	? configs.COLOR_ENUM
	: [
			"pink",
			"red",
			"yellow",
			"orange",
			"cyan",
			"green",
			"blue",
			"purple",
			"geekblue",
			"magenta",
			"volcano",
			"gold",
			"lime",
	  ];

export const defaultColor = "#d9d9d9";
