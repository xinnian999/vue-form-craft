# 全局配置

`vue-form-craft` 全局挂载的同时，可以传入一些全局配置

```ts
import { createApp } from 'vue'
import App from './App.vue'
import VueFormCraft from 'vue-form-craft'
import { request } from '@/utils'

const app = createApp(App)

app.use(VueFormCraft, { request }) //第二个参数为全局配置对象
app.mount('#app')
```

可选的全局配置如下：

| 参数名           | 类型                  | 默认值 | 是否必传 | 描述                                                                                       |
| ---------------- | --------------------- | ------ | -------- | ------------------------------------------------------------------------------------------ |
| request          | Function              | axios  | No       | 所有组件请求接口的api方法，推荐传入二次封装后的axios实例                                   |
| getSchema        | schemaId => `Promise` | ———    | No       | 异步函数， 当`FormDesign`或`SchemaForm` 传入schemaId时，会调用此方法来尝试获取远程的schema |
| iconSelectConfig | Object                | ———    | No       | 用于定制图标选择器                                                                         |
| customElements   | Object                | ———    | No       | 用于定制所有组件的ui                                                                       |


## 定制图标选择器

```ts

import { createApp } from "vue";
import App from "./App.vue";
import vueFormCraft from "vue-form-craft";
import SvgIcon from "@/components/SvgIcon.vue";

const files = require.context("./assets/icons", true, /\.svg$/);

const iconList = files.keys().map((key) => {
  return key.match(/\/([^\/]+)\.svg$/)[1];
});

const vue = createApp(App);

vue.use(vueFormCraft, {
  icon: {
    component: SvgIcon, //传入你项目中的icon组件
    propKey: "name", //你的icon组件 icon标识参数
    iconList // 将使用你的icon组件，给图标选择器生成列表。例如['add','form','copy'...]
    }
});

vue.mount("#app");

```

### 定制使用其他组件库

可能你并不喜欢element ui的组件风格，或者你项目里用的是其他ui库。那么你也可以选择**vue-form-craft** ，因为它提供了ui库定制功能

全局配置`customElements`可以用来定制所有内置组件，比如你想将内置组件替换成`ant-design-vue`风格，示例如下：

```js
import { createApp } from 'vue'
import App from './App.vue'
import VueFormCraft from 'vue-form-craft'
import { request } from '@/utils'
import { Switch, Input, Textarea, InputNumber } from 'ant-design-vue'

const app = createApp(App)

app.use(VueFormCraft, { 
  request,
  customElements: {
      Input: {
        component: Input,
        modelName: 'value'
      },
      Switch: {
        component: Switch,
        modelName: 'checked'
      },
      Textarea: {
        component: Textarea,
        modelName: 'value'
      },
      InputNumber: {
        component: InputNumber,
        modelName: 'value'
      }
    }
})

app.mount('#app')

```


可能不同组件库的参数会不一样，比如el都是直接使用`v-model:modelValue`，而ant大部分都是`v-model:value`，所以提供了modelName来指定v-model的名字

而其他参数不一样的问题，可以选择二次封装将组件的props都封装符合el参数格式的组件，再传给customElements

也可以通过**attr**来自行配置每个字段的**字段配置**，和JsonSchema的items配置一样，配置成符合对应组件库参数的attr表单

```js
 Switch: {
        component: Switch,
        modelName: 'checked',
        attrs: [
          { label: '标签', component: 'Input', name: 'label' },
          {
            label: '唯一标识',
            component: 'Input',
            name: 'name',
            help: "既是唯一标识，也是数据路径。比如输入【props.name】，数据就会保存为 { props: { name:'xxx' } }"
          },
          { label: '字段说明', component: 'Textarea', name: 'help' },
          {
            label: '占位提示',
            component: 'Input',
            name: 'props.placeholder',
            designKey: 'form-ekRL'
          },
          { label: '初始值', component: 'Input', name: 'initialValue' },
          { label: '是否必填', component: 'Switch', name: 'required' },
          { label: '是否只读', component: 'Switch', name: 'props.readonly' },
          { label: '是否禁用', component: 'Switch', name: 'props.disabled' },
          { label: '隐藏字段', component: 'Switch', name: 'hidden' },
          { label: '隐藏标签', component: 'Switch', name: 'hideLabel' }
        ]
      }
```