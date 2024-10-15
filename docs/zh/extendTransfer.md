# 扩展一个穿梭框

下面展示一下，如何给表单设计器扩展一个**穿梭框**

## 创建目录

和上一篇 [例：扩展markdown输入框](/zh/extendMd.html) 差不多，与`/Markdown`同级，创建目录

```
src
└── extendElements
  └── index.ts
  └── Markdown
    └── attrSchema.ts
    └── Component.vue
    └── Icon.vue
    └── index.ts
+ └── Transfer 
  + └── attrSchema.ts
  + └── Component.vue
  + └── Icon.vue
  + └── index.ts
```

## 封装穿梭框组件

```vue
// src/extendElements/Transfer/Component.vue
<template>
  <div v-if="formInstance.read">
    {{ value?.map((val) => data.find((v) => v.key === val)?.label).join('、') }}
  </div>
  <el-transfer v-else v-bind="$attrs" :data="data" @change="onChange" v-model="value" />
</template>

<script setup lang="ts">
import type { TransferDataItem, TransferKey } from 'element-plus'
import { useFormInstance } from 'vue-form-craft'

const props = defineProps<{ name: string; data: TransferDataItem[] }>()

const formInstance = useFormInstance() // 获取到表单实例

const value = defineModel<TransferKey[]>()

const onChange = (value: TransferKey[]) => {
  const source = value.map((val) => props.data.find((v) => v.key === val))
  formInstance.updateSelectData(props.name, source) // 向SelectData保存选中项的数据源
}
</script>
```


## 封装Icon

在 [阿里iconfont](https://www.iconfont.cn/) 找一个合适的icon ，复制svg代码 ， 写到一个vue文件里即可！

**当然如果你项目里，有封装好的Icon渲染组件，可以直接用，跳过这一步！**

```vue
// src/extendElements/Transfer/Icon.vue
<template>
  <svg
    t="1726107434564"
    class="icon"
    viewBox="0 0 1024 1024"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    p-id="3897"
    width="20"
    height="20"
  >
    <path
      d="M854.6 288.6L639.4 73.4c-6-6-14.1-9.4-22.6-9.4H192c-17.7 0-32 14.3-32 32v832c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V311.3c0-8.5-3.4-16.7-9.4-22.7zM790.2 326H602V137.8L790.2 326z m1.8 562H232V136h302v216c0 23.2 18.8 42 42 42h216v494z"
      p-id="3898"
    ></path>
    <path
      d="M429 481.2c-1.9-4.4-6.2-7.2-11-7.2h-35c-6.6 0-12 5.4-12 12v272c0 6.6 5.4 12 12 12h27.1c6.6 0 12-5.4 12-12V582.1l66.8 150.2c1.9 4.3 6.2 7.1 11 7.1H524c4.7 0 9-2.8 11-7.1l66.8-150.6V758c0 6.6 5.4 12 12 12H641c6.6 0 12-5.4 12-12V486c0-6.6-5.4-12-12-12h-34.7c-4.8 0-9.1 2.8-11 7.2l-83.1 191-83.2-191z"
      p-id="3899"
    ></path>
  </svg>
</template>

```

## 配置项表单

通过设计器拖拽，制作的表单，将JsonSchema导出使用！

```ts
// src/extendElements/Transfer/attrSchema.ts
import type { FormSchema } from 'vue-form-craft'

export default {
  size: 'small',
  labelAlign: 'top',
  items: [
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
    {
      component: 'Grid',
      children: [
        { label: '是否必填', component: 'Switch', name: 'required' },
        { label: '是否禁用', component: 'Switch', name: 'props.disabled' },
        { label: '隐藏字段', component: 'Switch', name: 'hidden' },
        { label: '隐藏标签', component: 'Switch', name: 'hideLabel' }
      ],
      props: {
        columns: 3,
        'row-gap': 0,
        'column-gap': 20
      },
      designKey: 'form-R003',
      name: 'cNmCuu',
      style: {
        marginBottom: 0
      }
    },
    {
      component: 'Divider',
      props: {
        title: '选项设置',
        contentPosition: 'center'
      },
      designKey: 'design-gSnX',
      name: 'form-xDEe',
      style: {
        marginTop: '40px'
      }
    },
    {
      label: '静态选项',
      name: 'props.data',
      component: 'FormList',
      children: [
        {
          label: '选项名',
          name: 'label',
          component: 'Input',
          props: {
            placeholder: '请输入...'
          },
          designKey: 'form-LnGh'
        },
        {
          label: '选项值',
          name: 'key',
          component: 'Input',
          props: {},
          designKey: 'form-HYtW'
        }
      ],
      designKey: 'form-Iwpd',
      props: {
        mode: 'table',
        newItemDefaults:
          '{{ (index) => ({ label: `选项${index + 1}`, key: `value${index + 1}` }) }}'
      }
    },
  ]
} satisfies FormSchema
```

## 总配置

上面的几个文件，合并成一个`FormElement`对象，也就是一个完整的扩展组件！

> 这里可以直接使用 `ElTransfer` 作为渲染组件，无需二次封装

```ts
// src/extendElements/Transfer/index.ts
import type { FormElement } from 'vue-form-craft'
import icon from './Icon.vue'
import attrSchema from './attrSchema'

export default {
  name: '穿梭框',
  component: 'ElTransfer',
  icon,
  type: 'basic',
  order: 12,
  initialValues: {
    label: '穿梭框',
    component: 'Transfer',
    props: {
      data: [
        { label: '选项一', key: 'value1' },
        { label: '选项二', key: 'value2' },
        { label: '选项三', key: 'value3' }
      ]
    }
  },
  attrSchema
} satisfies FormElement
```

## 导出，使用

```ts
// src/extendElements/index.ts
import Markdown from './Markdown'
import Transfer from './Transfer'

export default {
    Markdown,
    Transfer
}
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
