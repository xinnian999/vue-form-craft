## 全局配置

`vue-form-craft` 全局挂载的同时，可以传入一些全局配置

```vue
import { createApp } from 'vue'
import App from './App.vue'
import VueFormCraft from 'vue-form-craft'
import { request } from '@/utils'

const app = createApp(App)

app.use(VueFormCraft, { request }) //第二个参数为全局配置对象
app.mount('#app')
```

可选的全局配置如下：

| 参数名         | 类型                    | 默认值 | 是否必传 | 描述                                                                            |
| -------------- | ----------------------- | ------ | -------- | ------------------------------------------------------------------------------- |
| request        | Function                | axios  | No       | 所有组件请求接口的api方法，推荐传入二次封装后的axios实例                        |
| getSchema      | schemaId => `Promise`   | ———    | No       | 当`FormDesign`或`SchemaForm` 传入schemaId时，会调用此方法来尝试获取远程的schema |
| icon           | [iconProps](#iconprops) | ———    | No       | 用于定制图标选择器                                                              |
| customElements | customElementsProps     | ———    | No       | 用于定制所有组件的ui                                                            |


### iconProps

```vue

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
    iconList // 将使用你的icon组件，给图标选择器生成list。例如['add','form','copy'...]
    }
});

vue.mount("#app");

```