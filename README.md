# 模仿 antd 如何将内部状态与外部状态同步

```jsx
const [innerValue, setInnerValue] = useState(!!defaultOuterValue);

const handleOnChange = (value) => {
	setInnerValue(value);
	outerOnChange?.(value);
};
// 如果需要处理 defaultValue 则另外声明
<SomeComponent propName={props.hasOwnProperty("propName") ? outerValue : innerValue} />;
```
