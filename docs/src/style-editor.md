# 样式编辑器

样式编辑器是一个可拖拽的自定义组件，它以表单的形式编辑各种CSS样式属性，最终生成一个style对象。

## 功能特点

- 📝 **可视化编辑**：通过表单界面编辑CSS样式，无需手写代码
- 🎨 **全面的样式支持**：支持布局、边距、边框、背景、文字、定位、Flex等常用CSS属性
- 🔄 **实时预览**：编辑后立即生成style对象
- 🎯 **类型安全**：完整的TypeScript类型支持
- 🧹 **自动清理**：自动过滤空值，只保留有效的样式属性

## 基础使用

:::demo

demo/StyleEditorDemo.vue

:::

## 在表单配置中使用

在FormDesign或FormRender的schema中，可以这样配置：

```typescript
{
  label: '自定义样式',
  component: 'Custom',
  name: 'style',
  props: {
    componentName: 'FormDesign-StyleEditor'
  }
}
```

## 支持的样式属性

### 布局相关

- **宽度/高度**：width、height、minWidth、minHeight、maxWidth、maxHeight

### 外边距

- **margin**：marginTop、marginRight、marginBottom、marginLeft

### 内边距

- **padding**：paddingTop、paddingRight、paddingBottom、paddingLeft

### 边框

- **border**：borderWidth、borderStyle、borderColor、borderRadius

### 背景

- **background**：backgroundColor、backgroundImage、backgroundSize、backgroundPosition、backgroundRepeat

### 文字

- **font**：fontSize、fontWeight、color、lineHeight、textAlign、textDecoration

### 显示

- **display**：display、position、top、right、bottom、left、zIndex、opacity、overflow

### Flex布局

- **flex**：flexDirection、justifyContent、alignItems、flexWrap、gap

### 其他

- **效果**：cursor、boxShadow、transition、transform

## 使用示例

### 示例1：按钮样式编辑

```vue
<template>
  <FormRender v-model="formData" :schema="schema" />
  <el-button :style="formData.buttonStyle">预览按钮</el-button>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const formData = ref({
  buttonStyle: {}
})

const schema = {
  items: [
    {
      label: '按钮样式',
      component: 'Custom',
      name: 'buttonStyle',
      props: {
        componentName: 'FormDesign-StyleEditor'
      }
    }
  ]
}
</script>
```

### 示例2：卡片样式编辑

```vue
<template>
  <FormRender v-model="formData" :schema="schema" />
  <div :style="formData.cardStyle" class="card">
    <h3>卡片标题</h3>
    <p>卡片内容</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const formData = ref({
  cardStyle: {
    padding: '20px',
    borderRadius: '8px',
    backgroundColor: '#f5f5f5',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
  }
})

const schema = {
  items: [
    {
      label: '卡片样式',
      component: 'Custom',
      name: 'cardStyle',
      props: {
        componentName: 'FormDesign-StyleEditor'
      }
    }
  ]
}
</script>
```

### 示例3：Flex布局编辑

```vue
<template>
  <FormRender v-model="formData" :schema="schema" />
  <div :style="formData.containerStyle">
    <div class="item">项目1</div>
    <div class="item">项目2</div>
    <div class="item">项目3</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const formData = ref({
  containerStyle: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '10px',
    padding: '20px',
    backgroundColor: '#f0f0f0'
  }
})

const schema = {
  items: [
    {
      label: '容器样式',
      component: 'Custom',
      name: 'containerStyle',
      props: {
        componentName: 'FormDesign-StyleEditor'
      }
    }
  ]
}
</script>
```

## API

### Props

| 属性名     | 说明                | 类型                  | 默认值 |
| ---------- | ------------------- | --------------------- | ------ |
| modelValue | 样式对象（v-model） | `Record<string, any>` | `{}`   |

### Events

| 事件名            | 说明               | 回调参数                               |
| ----------------- | ------------------ | -------------------------------------- |
| update:modelValue | 样式对象更新时触发 | `(value: Record<string, any>) => void` |

## 注意事项

1. **单位处理**：输入框中的值需要包含单位（如 `10px`、`50%`、`1rem`等），组件不会自动添加单位
2. **颜色格式**：颜色选择器支持rgba格式，可以设置透明度
3. **空值过滤**：保存时会自动过滤掉空值和undefined，只保留有效的样式属性
4. **样式优先级**：生成的style对象可以直接绑定到元素的`:style`属性上

## 常见问题

### 如何设置默认样式？

在formData中直接设置初始值即可：

```typescript
const formData = ref({
  myStyle: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#fff'
  }
})
```

### 如何重置样式？

点击对话框中的"清空"按钮，或者直接将modelValue设置为空对象：

```typescript
formData.value.myStyle = {}
```

### 样式不生效怎么办？

1. 检查CSS属性名是否正确（使用驼峰命名，如`backgroundColor`而不是`background-color`）
2. 检查属性值是否包含正确的单位
3. 检查是否有其他样式覆盖了当前样式（CSS优先级问题）
