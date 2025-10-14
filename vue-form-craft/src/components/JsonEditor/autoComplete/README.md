# JsonEditor 自动补全模块

这是一个为 JsonEditor 提供智能自动补全和悬停提示的模块化系统。

## 📁 模块结构

```
autoComplete/
├── index.ts              # 主入口，集成所有功能
├── items.ts              # 补全项数据定义
├── contextAnalyzer.ts    # 上下文分析工具
├── completionProvider.ts # 补全项提供器
├── tooltip.ts            # 悬停提示功能
└── README.md             # 本文档
```

## 📦 模块说明

### 1. **index.ts** - 主入口
- 导出 `setupAutoComplete()` 函数
- 集成自动补全和悬停提示功能
- 配置 Ace 编辑器选项和快捷键

### 2. **items.ts** - 数据定义
- `CompletionItem` 接口定义
- `FORM_CONFIG_ITEMS` - 表单全局配置项
- `FORM_ITEM_CONFIG_ITEMS` - 表单项配置项
- `EXPRESSION_ITEMS` - 表达式变量
- `COMPONENT_ITEMS` - 组件类型

### 3. **contextAnalyzer.ts** - 上下文分析
提供以下分析函数：
- `isInExpression()` - 检查是否在 `{{ }}` 表达式内
- `isInKeyPosition()` - 判断是否在 JSON key 位置
- `isAtRootLevel()` - 判断是否在根层级（表单全局配置）
- `isInItemsFirstLevel()` - 判断是否在 items 数组第一层
- `getCurrentFieldName()` - 获取当前字段名

### 4. **completionProvider.ts** - 补全提供器
- `getCompletionItems()` - 根据上下文返回合适的补全项
- `filterCompletionItems()` - 过滤和格式化补全项

### 5. **tooltip.ts** - 悬停提示
- `getFieldDescription()` - 获取字段描述
- `setupTooltip()` - 设置鼠标悬停提示功能

## 🚀 使用方式

```typescript
import { setupAutoComplete } from './autoComplete'

// 在 JsonEditor 初始化后调用
setupAutoComplete(jsonEditorInstance)
```

## ✨ 功能特性

### 自动补全
- **智能层级识别**：根据光标位置自动识别当前层级
- **枚举值补全**：为带枚举的字段提供精确的选项
- **表达式补全**：在 `{{ }}` 内提供 `$values` 等变量

### 悬停提示
- **字段描述**：鼠标悬停在字段名上显示详细说明
- **全行覆盖**：字段名的任何位置都能触发提示
- **优雅样式**：深色背景、圆角、阴影效果

## 🔧 扩展指南

### 添加新的配置项
在 `items.ts` 中添加：
```typescript
export const FORM_CONFIG_ITEMS: CompletionItem[] = [
  { 
    name: 'newField', 
    meta: '新字段说明', 
    score: 1000,
    enum: [
      { name: 'option1', meta: '选项1', score: 1000 },
      { name: 'option2', meta: '选项2', score: 999 }
    ]
  }
]
```

### 添加新的上下文分析
在 `contextAnalyzer.ts` 中添加新的分析函数。

### 自定义补全逻辑
在 `completionProvider.ts` 的 `getCompletionItems()` 中添加新的判断逻辑。

## 📝 维护建议

1. **数据与逻辑分离**：配置数据放在 `items.ts`，逻辑放在其他模块
2. **单一职责**：每个模块只负责一个功能领域
3. **类型安全**：充分利用 TypeScript 类型系统
4. **文档更新**：添加新功能时同步更新本文档
