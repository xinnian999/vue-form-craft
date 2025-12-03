# Formora 多 UI 适配方案

## 现状

当前低代码表单/表单设计器，是基于 Element-Plus 开发的。schema大部分组件的协议字段，也遵循了element-plus的风格。

所以只能配合Element-Plus 使用。

## 目标

- **支持多 UI**：支持 Element-Plus / Arco / Ant Design Vue / Naive UI 等，甚至自定义组件库。
- **保持单库发布**：继续使用一个 npm 包 `formora`，UI 库由用户自行安装。
- **渐进迁移**：兼容现有“以 element-plus 为主”的 schema，逐步演进为 UI 无关的抽象协议。

---

## 实现方案

### 1. 提炼组件协议

当前使用的每个`Element-Plus`组件，根据使用场景，提炼出一个`Protocol`接口。包含props、slots（emits通过on开头的驼峰函数整合进props），后续扩展其他UI库都要兼容这套协议。

- 首先提炼elements下基于El二次封装的组件，目前大部分组件都是直接透传参数给el原组件，提炼的话首先应该根据attrSchema支持props配置生成。
- 其次提炼Form、FormItem，可基于FormRender里的使用场景。
- 提炼其他设计器使用到的工具组件，如Button、Dialog
- 提炼出的每个组件`Protocol`，需要放到总的`UIAdapter`里，作为内置组件库的类型。 这个`UIAdapter`与UI库解耦，其他UI库需要往这个接口适配

### 2. 适配UI库的过程实现

扩展每个ui库都需要根据`UIAdapter`接口，去适配每一个内置组件的协议。

利用`defineComponent`，在内部中转props,slots，来实现适配。

最后获得一个适配了所有内置组件的`UIAdapter`对象。

需要内置实现几套常用UI的`UIAdapter`对象，比如`Element-Plus`,`ant-design-vue`,`Arco`等，然后作为库的导出。

### 3. 使用方式

Vue.use.options将扩展一个`ui`参数（非必传），这个参数需要接收一个UIadapter对象。默认是`Element-Plus`的UIadapter。

内部将通过provide向全局注入UIadapter。

**封装useUI**，`useUI`通过inject接收，然后返回UIadapter。将库中所有使用的el组件换成从useUI获取

## 切换UI方式

**注意:UI库在项目初始化时确定,不支持运行时动态切换。**

### 1. 切换内置 UI

项目内会适配几套常用UI。全局注册组件时，可额外传递`ui`，可从formora导入内置的某UIadapter。

formora会将所有组件库外部化，切换UIadapter，需要使用者自行安装对应UI库。

### 2. 自定义 UI 转换层

用户可自定义 UI 转换层，通过全局注册组件时，提供转换层函数。
