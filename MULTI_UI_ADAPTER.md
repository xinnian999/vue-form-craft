# Formora 多 UI 适配方案

## 现状

当前低代码表单/表单设计器，是基于 Element-Plus 开发的。schema大部分组件的协议字段，也遵循了element-plus的风格。

所以只能配合Element-Plus 使用。

## 目标

- **与`Element-Plus`解偶** 提炼出一套固定的UI协议，后续其他UI库都要兼容这套协议。
- **支持多 UI**：支持 Element-Plus / Arco / Ant Design Vue / Naive UI 等，甚至自定义组件库。
- **保持单库发布**：继续使用一个 npm 包 `formora`，UI 库由用户自行安装。
- **渐进迁移**：兼容现有“以 element-plus 为主”的 schema，逐步演进为 UI 无关的抽象协议。

---

## 实现方案

### 1. UI协议

为当前使用的每个`Element-Plus`组件，提炼出一套合适的UI协议，包含了props,emits,slots，后续其他UI库都要兼容这套协议。

### 2. UI 转换层的实现

每个ui库都需要实现一套转换层。

转换层内，需要分别实现框架所有需要的ui组件的协议转换。

要转换的协议包括组件的props,emits,slots。

## 使用方式

### 1. 切换内置 UI

项目内会适配几套常用UI。全局注册组件时，可提供直接传递 UI 标识。全局会根据这个标识来转换对应ui。

### 2. 自定义 UI 转换层

用户可自定义 UI 转换层，通过全局注册组件时，提供转换层函数。
