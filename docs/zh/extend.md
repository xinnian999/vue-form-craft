# 扩展表单设计器

`form-magic` 提供了一些基础组件，例如 input、select 和 radio 等。

但有时候这些组件并不能完全满足我们的业务需求，此时可以考虑为 `form-magic` 的表单设计器扩展更多可拖拽组件，以满足更多需求且方便下次使用！

**了解以下教程后，你就可以扩展任何自定义的组件，或者任意组件库的组件过来拖拽使用！**


## 如何扩展？

只需要在全局注册`form-magic`时，传入一个`extendElements`配置即可！

`extendElements`是一个对象！组件名作为键，`FormElement`作为值！ 

```ts
type extendElements = { [key: string]: FormElement }

```

```ts
// main.ts
import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import FormMagic from '@form-magic/element-plus'
import extendElements from './extendElements'

const app = createApp(App)

app.use(ElementPlus)
app.use(FormMagic, { extendElements })
app.mount('#app')

```


## 组件对象FormElement

表单设计器的组件全部是由`FormElement`对象组成的，同理我们想扩展更多组件，需要按照`FormElement`的接口格式去配置，然后传给`form-magic`即可！

```ts
interface FormElement {
  name: string
  component: string | VNode | Component
  icon: VNode | Component
  type: 'assist' | 'layout' | 'basic'
  order: number
  initialValues: Omit<FormItemType, 'name'>
  modelName?: string
  attrSchema: FormSchema
}
```

下面详细介绍每个`FormElement`的每个属性：

### name 

组件名称

<img src="../assets/name.png" style="height:150px" />

### icon

组件Icon

icon格式为vue的SFC组件

<img src="../assets/icon.png" style="height:150px" />

### component

渲染该组件所用的Vue-SFC组件，可以是一个已经被全局注册的组件字符串，也可以直接传入组件定义或者VNode!

### type

组件类型，这个参数决定了组件位于左侧菜单的哪个分类，如果`type='basic'`，那么组件需要能接收v-model

### order

左侧菜单会按照order大小排序所有组件

### initialValues

拖拽生成组件时，会向`schema.items`里，增添的该组件默认配置。 

设计器右侧，实际上编辑的也是这个参数！

> `initialValues.component` 是必传的，它代表调用哪个`FormElement`！ 所以，这个参数决定了使用哪个组件，所以需要和`FormElement`的键一致，才能正确渲染

### modelName

传给组件的v-model名称，默认是modelValue

### attrSchema

组件的配置表单的schema.

当选中某个表单项时，在右侧可以编辑该表单项的各种配置，实际上这个右侧也是用`FormRender`渲染的！ 所以，建议用设计器去拖拽生成，然后copy过来！

![alt text](../assets/attr.png)