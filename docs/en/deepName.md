# Deep Data Binding

During development, you often encounter situations where you need to convert frontend data to match the server-side data structure.

For example, the data you collect from a form may look like this:

```js
{
    id: 1,
    name: "吴彦祖",
    desc: "中国最帅的男人",
    age: 42,
    tag:['a','b']
}
```

But the backend expects to receive data in this format:

```js
{
    id: 1,
    info:{
        basic:{
            name: "吴彦祖",
            desc: "中国最帅的男人",
            age: 42,
        },
        tag:['a','b']
    }
}
```

To solve this problem, the **name** field is expanded as a magic field, serving as both a unique identifier and a data path, allowing you to freely specify the hierarchical storage of data.

For example, if name is set to 【id】, the data will be saved as `{ id: 'xxx' }`.

If name is set to 【info.tag】, the data will be saved as `{ info: { tag:'xxx' } }`.

If name is set to 【info.basic.name】, the data will be saved as `{ info: { basic:{ name:'xxx' } } }`.

No matter how deep the data hierarchy is, it can be accurately traced and validated.

