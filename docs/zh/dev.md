# 二次开发指南

如果你需要更灵活的定制化功能，那么可以选择二次开发本项目。

## 方法一

1、将本项目`clone`下来

2、安装依赖

```sh
pnpm i
```

3、启动项目，开发者模式

```sh
pnpm dev
```

4、构建项目，生成`dist`目录。 

```sh
pnpm build
```

`packages/form-magic/dist/form-magic.js`就是依赖入口！

## 方法二 （copy源码）

>由于本项目采用了`monerepo`组织代码，所以源码搬到你项目里，会让你的项目也变成这种模式。所以看情况选用


1、将本项目的 `packages` 目录copy到你项目里的组件目录下。 比如 `src/components`下，并重命名为 `form-magic`

2、在你的项目根目录下，新建`pnpm-workspace.yaml`，写入以下配置(可根据你放入的位置调整)

```yaml

packages:
  - 'src/components/form-magic/*'

```

3、`修改package.json` 增加以下依赖，然后pnpm i

```json
  ...
  "dependencies": {
    ...
    "@/components": "workspace:*",
    "@/config": "workspace:*",
    "@/elements": "workspace:*",
    "@/form-design": "workspace:*",
    "@/form-render": "workspace:*",
    "@form-magic/core": "workspace:*",
    "@/icons": "workspace:*",
    "@/styles": "workspace:*",
    "@form-magic/core": "workspace:*",
    "@/utils": "workspace:*",
    "form-magic": "workspace:*",
    "@vue/test-utils": "^2.4.6",
    "element-plus": "^2.8.3",
    "lodash": "^4.17.21",
    "vue": "^3.5.13",
    "vuedraggable-es-fix": "^1.0.1",
    "sass": "~1.32.6"
  },
```

4、引入 `form-magic/` 到 `main.ts` 里注册即可。

<img src="../assets/dev.png" />