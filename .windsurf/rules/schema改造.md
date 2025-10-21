---
trigger: manual
---

Schema改造TODO:

@/utils下封装schemaUtils。
schemaUtils接收两个参数，get和set

get可以拿到最新schema

set可以更新schema

返回值：一系列对schema方便的增删改查方法。

set非必传，只有传入了set才会返回删、改方法

期望结果：Design实例拥有全面的schema方法。

Render实例只有schema的读取方法。

容器表单项特殊实现：

由于容器表单项在设计模式时，需要和schema对应节点双向绑定。

读取schema永远调用Render实例读取方法。而修改可以根据isDesign来判断是否允许修改，如果允许，再从Design实例获取删改方法
