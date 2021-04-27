# 模仿 antd 如何将内部状态与外部状态同步

```jsx
    const [innerValue, setInnerValue] = useState(!!defaultOuterValue);

    useEffect(()=>{
        if(!isUndefined(outerValue)) setInnerValue(outerValue)
    },[outerValue])

    const handleOnChange = (value)=>{
        if(isUndefined(outerValue)) setInnerValue(value)
        outerOnChange?.(value)
    }
```
##  该写法与 antd 不完全相同 antd 是判断 outerValueName in props 进行操作的。hooks写法会引入props这个依赖 因而简化为判断 value是否为undefined