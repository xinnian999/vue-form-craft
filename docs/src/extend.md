# 扩展表单设计器

如果`vue-form-craft`的内置组件不能完全满足我们的业务需求，可以为 `vue-form-craft` 扩展更多可拖拽组件！


## 如何扩展？

只需要在全局注册`vue-form-craft`时，传入`extendElements`！

`extendElements`是一个对象！key是**组件标识**，value是`FormElement`！

> 注意：key必须与`FormElement.component`字段一致！

```ts
type extendElements = { [key: string]: FormElement }
```

```ts
// main.ts
import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import VueFormCraft from 'vue-form-craft'
import extendElements from './extendElements'

const app = createApp(App)

app.use(ElementPlus)
app.use(VueFormCraft, { extendElements })
app.mount('#app')
```

## 组件对象FormElement

一个`FormElement`对象代表一个可拖拽组件。

同理我们想扩展更多组件，需要按照`FormElement`的接口格式去配置，然后传给`vue-form-craft`即可！

```ts
interface FormElement {
  title: string
  component: string
  render: string | VNode | Component
  icon: string | VNode | Component
  type: 'assist' | 'layout' | 'basic' | 'high'
  order: number
  modelName?: string
  attrSchema: FormSchema
}
```

下面详细介绍每个`FormElement`的每个属性：

### title

组件名称

<img src="../assets/name.png" style="height:150px" />

### icon

组件Icon

icon格式为vue的SFC组件

<img src="../assets/icon.png" style="height:150px" />

### component

组件标识字段，必须与`FormElement`的键一致，才能正确渲染！

### render

渲染该组件所用的Vue-SFC组件，可以是一个已经被全局注册的组件名称。

内部会通过`<component is="render"/>`去渲染它。

### type

组件类型，这个参数决定了组件位于左侧菜单的哪个分类，如果`type='basic'`，那么组件需要能接收v-model

### order

左侧菜单会按照order大小排序所有组件

### modelName

传给组件的v-model名称，默认是modelValue

### attrSchema

组件的配置表单的schema.

当选中某个表单项时，在右侧可以编辑该表单项的各种配置，实际上这个右侧也是用`FormRender`渲染的！ 所以，建议用设计器去拖拽生成，然后copy过来！

![alt text](../assets/attr.png)
