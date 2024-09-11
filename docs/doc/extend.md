# 扩展表单设计器

`vue-form-craft` 提供了一些基础组件，例如 input、select 和 radio 等。

但有时候这些组件并不能完全满足我们的业务需求，此时可以考虑为 `vue-form-craft` 的表单设计器扩展更多可拖拽组件，以满足更多需求且方便下次使用！


## 如何扩展？

只需要在全局注册`vue-form-craft`时，传入一个`extendElements`配置即可！

`extendElements`是一个以组件名作为key值，`FormElement`对象作为value值的对象！ 

```ts
type customElements = { [key: string]: FormElement }

```


## 组件对象FormElement

表单设计器的组件全部是由`FormElement`对象组成的，同理我们想扩展更多组件，需要按照`FormElement`的接口格式去配置，然后传给`vue-form-craft`即可！

```ts
interface FormElement {
  name: string
  component: VNode | Component
  icon: string | VNode | Component
  type: 'assist' | 'layout' | 'basic'
  order: number
  initialValues: Omit<FormItemType, 'name'>
  modelName?: string
  attrSchema: FormSchema
}
```