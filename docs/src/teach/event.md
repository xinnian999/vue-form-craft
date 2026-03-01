# 事件传递

`Vue`原生支持通过`props`来传递事件函数，传递类似`onClick`的Props参数，等价于`@click`。

同理我们也可以通过表单项的`props`来传递任意**事件函数**。

例如我们想监听某个`Input`的失焦事件，可以这样写：

::: demo

demo/teach/Event.vue

:::
