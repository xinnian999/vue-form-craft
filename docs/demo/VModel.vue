<template>
  <div style="max-width: 560px; margin: 20px auto">
    <FormRender v-model="formValues" :schema="schema" @finish="onFinish" />

    <div style="margin-top: 12px">
      <div style="display: flex">
        <el-button type="primary" @click="fillDemo">填充示例数据</el-button>
        <el-button @click="changeUsername">修改用户名</el-button>
        <el-button @click="toggleSubscribe">切换是否订阅</el-button>
        <el-button type="danger" @click="clearAll">清空</el-button>
      </div>
    </div>

    <div style="margin-top: 16px">
      <div style="font-weight: 600; margin-bottom: 6px">v-model 实时数据回显</div>
      <pre
        style="background: #eee; color: #000; padding: 12px; border-radius: 8px; overflow: auto"
        >{{ prettyJSON }}</pre
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import type { FormSchema } from 'vue-form-craft'
import { computed, ref } from 'vue'

// v-model 绑定对象：演示回显（初始给部分值）
const formValues = ref({
  username: '张三',
  gender: 'male',
  level: 'pro',
  subscribe: true,
  age: 28,
  desc: '这是一个初始的简介，用来演示表单回显。'
}) as unknown as any

const schema: FormSchema = {
  labelWidth: 100,
  labelAlign: 'right',
  size: 'default',
  submitBtn: false,
  items: [
    {
      label: '用户名',
      name: 'username',
      component: 'Input',
      required: true,
      props: {
        placeholder: '请输入用户名'
      }
    },
    {
      label: '性别',
      name: 'gender',
      component: 'Radio',
      required: true,
      // Radio/Checkbox 在本库中可直接通过 options 配置
      props: {
        options: [
          { label: '男', value: 'male' },
          { label: '女', value: 'female' }
        ]
      }
    },
    {
      label: '会员等级',
      name: 'level',
      component: 'Select',
      required: true,
      props: {
        placeholder: '请选择会员等级',
        options: [
          { label: '普通', value: 'basic' },
          { label: '专业', value: 'pro' },
          { label: '旗舰', value: 'enterprise' }
        ]
      }
    },
    {
      label: '是否订阅',
      name: 'subscribe',
      component: 'Switch',
      props: {
        activeText: '订阅',
        inactiveText: '未订阅'
      }
    },
    {
      label: '年龄',
      name: 'age',
      component: 'InputNumber',
      props: {
        min: 0,
        max: 120,
        placeholder: '请输入年龄'
      }
    },
    {
      label: '个人简介',
      name: 'desc',
      component: 'TextArea',
      props: {
        rows: 3,
        placeholder:
          "{{  $values.username ? $values.username + ' 的简介（根据用户名动态变化）' : '请输入简介'  }}"
      }
    }
  ]
}

const prettyJSON = computed(() => JSON.stringify(formValues.value, null, 2))

const fillDemo = () => {
  formValues.value = {
    username: '李四',
    gender: 'female',
    level: 'enterprise',
    subscribe: false,
    age: 32,
    desc: '通过“填充示例数据”按钮写入的表单值，将立即回显到界面。'
  }
}

const changeUsername = () => {
  formValues.value.username =
    (formValues.value?.username ? formValues.value.username : '用户') + '-已修改'
}

const toggleSubscribe = () => {
  formValues.value.subscribe = !formValues.value.subscribe
}

const clearAll = () => {
  formValues.value = {}
}

const onFinish = async () => {
  alert(JSON.stringify(formValues.value, null, 2))
}
</script>
