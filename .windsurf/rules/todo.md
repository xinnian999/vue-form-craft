---
trigger: always_on
---

2. 自增组件的联动教程文档
3. ai改造：准备在设计器多处注入ai能力，比如ai对话生成表单（已实现）、ai生成js表达式（已实现）、输入框ai生成文本（已实现），ai生成校验规则（已实现）。
4. 利用ai全面编写测试用例，方便后续迭代时产生bug。目前有一个比较困难的的点，就是设计器的拖拽功能不知道怎么编写测试用例
5. draggable是为了容器互相拖拽时，数据同步，所以直接修改schema树，这相当于直接修改props.schema 不符合直觉
6. FormRender的setFieldAttr也会修改props.schema 不符合直觉。已测试如果内部维护一份schema，会导致draggable不同步。
