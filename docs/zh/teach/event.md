# 事件传递

<red>`Vue`原生支持通过`props`来传递事件，传递类似`onClick`的Props参数，等价于`@click`。</red>

同理我们也可以通过表单项的`props`来传递任意事件。

> 为了保证纯json格式，事件函数需要使用《JS表达式》包裹好处是可以在函数中使用联动变量。

例如我们想监听某个`Input`的事件，可以这样写：

::: demo

demo/submit/Event.vue

:::
