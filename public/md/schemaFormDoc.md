## 简介

SchemaForm 是 vue-form-craft 的渲染组件。

```vue
<template>
  <schema-form v-model="formValues" :schema="schema" ref="formRef" />
  <button @click="handleSubmit">提交</button>
</template>

<script setup>
import { ref } from 'vue'

const formRef = ref()

const formValues = ref({
  title: 'test',
  desc: '这是一个简单基本的描述'
})

const schema = {
  labelWidth: 150,
  labelAlign: 'right',
  size: 'default',
  items: [
    {
      label: '标题',
      component: 'Input',
      props: {
        placeholder: '请输入标题'
      },
      designKey: 'form-eNR0',
      name: 'title',
      required: true
    },
    {
      label: '描述',
      component: 'Textarea',
      props: {
        placeholder: '请输入描述'
      },
      designKey: 'form-D1x7',
      name: 'desc'
    }
  ]
}

const handleSubmit = () => {
  formRef.value
    .submit()
    .then((values) => {
      alert(JSON.stringify(values))
    })
    .catch((e) => console.log(e))
}
</script>
```

## Props

| 参数名        | 类型       | 默认值  | 是否必传 | 描述                                     |
| ------------- | ---------- | ------- | -------- | ---------------------------------------- |
| v-model       | object ref | ref({}) | No       | 表单数据对象，用于控制表单值，双向绑定   |
| schema        | object     | --      | No       | 表单Schema配置，纯JSON，用于描述表单结构 |
| schemaContext | object     | {}      | No       | 自定义的联动变量                         |
| style         | any        | ———     | No       | 表单的style                              |
| class         | any        | ———     | No       | 表单的class                              |


## Events

| 事件名   | 类型         | 描述             |
| -------- | ------------ | ---------------- |
| onSubmit | values=>void | 表单提交时触发   |
| onChange | values=>void | 表单值改变时触发 |

## Exposes

>组件暴露出的方法，通过ref调用

| 名称          | 类型                  | 描述                                   |
| ------------- | --------------------- | -------------------------------------- |
| submit        | ()=>Promise\<values\> | 提交表单，会先触发校验                 |
| validate      | ()=>Promise           | 校验表单                               |
| reset         | ()=>void              | 重置表单                               |
| getFormValues | ()=>void              | 获取表单值                             |
| setFormValues | (values)=>void        | 修改表单值，常用于表单回显             |
| selectData    | Array                 | 选择类型的组件，已选项对应的数据源集合 |
| context       | {}                    | 表单的联动变量                         |




## 提交表单

提交表单，会先触发表单的校验，校验通过才会执行onSubmit回调。下面是两个示例：

>示例一：通过ref去调用组件暴露的submit方法
```vue
<template>
  <schema-form :schema="schema" ref="formRef" />
  <button @click="handleSubmit">提交</button>
</template>

<script setup>
import { ref } from 'vue'

const formRef = ref()

const schema = {
  labelWidth: 150,
  labelAlign: 'right',
  size: 'default',
  items: [
    {
      label: '用户名',
      component: 'Input',
      props: {
        placeholder: '请输入用户名'
      },
      designKey: 'form-eNR0',
      name: 'username',
      initialValue: 10
    },
    {
      label: '密码',
      component: 'Password',
      props: {
        placeholder: '请输入密码'
      },
      designKey: 'form-D1x7',
      name: 'password',
      required: true
    }
  ]
}

const handleSubmit = () => {
  formRef.value
    .submit()
    .then((values) => {
      alert(JSON.stringify(values))
    })
    .catch((e) => console.log('表单校验不通过！',e))
}
</script>
```


>示例二：使用低代码按钮组件提交，通过onSubmit去处理提交逻辑
```vue
<template>
  <schema-form :schema="schema" @onSubmit="onSubmit" />
</template>

<script setup>
const schema = {
  labelWidth: 150,
  labelAlign: 'right',
  size: 'default',
  items: [
    {
      label: '用户名',
      component: 'Input',
      props: {
        placeholder: '请输入用户名'
      },
      designKey: 'form-eNR0',
      name: 'username',
      initialValue: 10
    },
    {
      label: '密码',
      component: 'Password',
      props: {
        placeholder: '请输入密码'
      },
      designKey: 'form-D1x7',
      name: 'password'
    },
    {
      component: 'Button',
      props: {
        name: '提交',
        clickEvent: 'submitForm'
      },
      designKey: 'form-aBMY',
      name: 'submit',
    }
  ]
}
//表单提交，且校验通过才会触发
const onSubmit = (values) => {
  alert(JSON.stringify(values))
}
</script>

```
