## 全局配置

`vue-form-craft` 全局挂载的同时，可以传入一些全局配置

```vue
import { createApp } from 'vue'
import App from './App.vue'
import VueFormCraft from 'vue-form-craft'
import { request } from '@/utils'

const app = createApp(App)

app.use(VueFormCraft, { request }) //第二个参数为options 
app.mount('#app')
```

可选的全局配置如下：

| 参数名    | 类型                  | 默认值 | 是否必传 | 描述                                                                            |
| --------- | --------------------- | ------ | -------- | ------------------------------------------------------------------------------- |
| request   | Function              | axios  | No       | 所有组件请求接口的api方法，推荐传入二次封装后的axios实例                        |
| getSchema | schemaId => `Promise` | ———    | No       | 当`FormDesign`或`SchemaForm` 传入schemaId时，会调用此方法来尝试获取远程的schema |
