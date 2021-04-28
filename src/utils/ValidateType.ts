// 判断类型
type VariableType =
	| "Object"
	| "Array"
	| "Undefined"
	| "Null"
	| "Number"
	| "String"
	| "Boolean"
	| "Function"
	| "Symbol"
	| "BigInt"
	| "AsyncFunction"
	| "Map"
const validateType = (obj: any, type: VariableType) =>
	Object.prototype.toString.call(obj) === `[object ${type}]`

export const isObject = (obj: any): obj is object => validateType(obj, "Object")
export const isArray = Array.isArray
export const isUndefined = (obj: any): obj is undefined =>
	validateType(obj, "Undefined")
export const isNull = (obj: any): obj is null => validateType(obj, "Null")
export const isNumber = (obj: any): obj is number => validateType(obj, "Number")
export const isString = (obj: any): obj is string =>
	validateType(obj as string, "String")
export const isBoolean = (obj: any): obj is boolean =>
	validateType(obj, "Boolean")
export const isFunction = (obj: any): obj is Function => typeof obj === 'function'
	// validateType(obj, "Function") 因为有很多function类型
export const isAsyncFunction = (obj: any): obj is Function =>
	validateType(obj, "AsyncFunction")
export const isSymbol = (obj: any): obj is symbol => validateType(obj, "Symbol")
export const isBigInt = (obj: any): obj is bigint => validateType(obj, "BigInt")
export const isMap = (obj: any): obj is Map<any, any> =>
	validateType(obj, "Map")

export const isNullUndefined = (obj: any):obj  is null | undefined => isNull(obj) || isUndefined(obj)
