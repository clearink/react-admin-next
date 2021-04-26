import { ColSpan } from "./interface";
/**
 * var responsiveMap = {
  xs: '(max-width: 575px)',
  sm: '(min-width: 576px)',
  md: '(min-width: 768px)',
  lg: '(min-width: 992px)',
  xl: '(min-width: 1200px)',
  xxl: '(min-width: 1600px)'
};
 */
export const FULL_SCREEN_SPAN = 24;
export const colSpan: ColSpan = [
	{
		size: 575,
		type: "max",
	},
	{
		size: 576,
		span:12,
	},
	{
		size: 768,
		span: 12,
	},
	{
		size: 992,
		span: 8,
	},
	{
		size: 1200,
		span: 6,
	},
	{
		size: 1600,
		span: 4,
	},
];
