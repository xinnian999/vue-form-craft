# useFormInstance

获取当前上下文正在使用的 Form 实例，常见于封装子组件消费无需透传 Form 实例。

这在你扩展自定义组件时，将会特别有用！

```ts
const useFormInstance: () => FormInstance
```