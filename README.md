# 模仿 antd 如何将内部状态与外部状态同步

```tsx
const [innerValue, setInnerValue] = useState(!!defaultOuterValue);

const handleOnChange = (value) => {
	setInnerValue(value);
	outerOnChange?.(value);
};
// 如果需要处理 defaultValue 则另外声明
<SomeComponent propName={props.hasOwnProperty("propName") ? outerValue : innerValue} />;
```

# 处理 forwardRef 使用时 对于泛型组件不支持的问题

```tsx
	// Component.tsx
	function Component<T>(props:SomeProps<T>,ref:Ref<SomeRef>){
		return <div />
	}

type ProComponentType = <T extends other >(
	props: SomeProps<T>
) => ReactElement;

	export default forwardRef(Component) as ProComponentType

	// interface.tsx
	export interface SomeProps<T>{ 
		ref?:Ref<SomeRef>
	}
```
