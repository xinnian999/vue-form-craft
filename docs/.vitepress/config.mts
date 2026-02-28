import { defineConfig } from 'vitepress'
import { mdVueDemoPlugin } from 'vitepress-vue-demo'

export default defineConfig({
  lang: 'zh',
  srcDir: 'src',
  title: 'VueFormCraft',
  description: '基于vue3的一个开箱即用低代码表单方案',
  base: '/vue-form-craft/',
  vite: {
    server: {
      port: 9999,
      host: true
    }
  },
  head: [['link', { rel: 'icon', href: '/vue-form-craft/favicon.svg' }]],
  markdown: {
    config: (md) => {
      md.use(mdVueDemoPlugin, { root: './' })
    }
  },
  themeConfig: {
    search: {
      provider: 'local'
    },
    socialLinks: [{ icon: 'github', link: 'https://github.com/xinnian999/vue-form-craft' }],
    logo: '/favicon.svg',
    nav: [
      { text: '首页', link: '/' },
      { text: '文档', link: '/introduce' },
      { text: '教程', link: '/teach/submit' },
      { text: '在线体验', link: '/form-design' }
    ],
    sidebar: {
      '/': [
        {
          text: '基础',
          items: [
            { text: '简介', link: '/introduce' },
            { text: '快速开始', link: '/use' },
            { text: 'JsonSchema协议', link: '/schema' }
          ]
        },
        {
          text: '进阶',
          items: [
            { text: '表单联动', link: '/linkage' },
            { text: '数据校验', link: '/rules' },
            { text: '自定义组件', link: '/custom-component' },
            { text: 'AI 能力', link: '/ai' }
          ]
        },
        {
          text: '组件',
          items: [
            { text: 'FormDesign 表单设计器', link: '/form-design-doc' },
            { text: 'FormRender 表单渲染器', link: '/form-render-doc' },
            { text: 'Input 输入框', link: '/components/input' },
            { text: 'InputNumber 数字输入框', link: '/components/input-number' },
            { text: 'Password 密码输入框', link: '/components/password' },
            { text: 'TextArea 多行输入框', link: '/components/text-area' },
            { text: 'Radio 单选框组', link: '/components/radio' },
            { text: 'Select 下拉选择框', link: '/components/select' },
            { text: 'Checkbox 多选框组', link: '/components/checkbox' },
            { text: 'Cascader 级联选择器', link: '/components/cascader' },
            { text: 'Switch 开关', link: '/components/switch' },
            { text: 'ColorPicker 颜色选择器', link: '/components/color-picker' },
            { text: 'DatePicker 日期选择器', link: '/components/date-picker' },
            { text: 'Rate 评分', link: '/components/rate' },
            { text: 'Slider 滑块', link: '/components/slider' },
            { text: 'Upload 上传', link: '/components/upload' },
            { text: 'Text 文本', link: '/components/text' },
            { text: 'Alert 提示框', link: '/components/alert' },
            { text: 'Title 标题', link: '/components/title' },
            { text: 'Tag 标签', link: '/components/tag' },
            { text: 'Divider 分割线', link: '/components/divider' },
            { text: 'Card 卡片', link: '/components/card' },
            { text: 'Inline 行内布局', link: '/components/inline' },
            { text: 'Grid 栅格布局', link: '/components/grid' },
            { text: 'Collapse 折叠面板', link: '/components/collapse' },
            { text: 'Tabs 选项卡', link: '/components/tabs' },
            { text: 'FormList 自增容器', link: '/components/form-list' },
            { text: 'VerifyCode 图形验证码', link: '/components/verify-code' },
            { text: 'Esign 电子签名', link: '/components/esign' },
            { text: 'CodeEditor 代码编辑器', link: '/components/code-editor' },
            { text: 'FunctionEditor 函数编辑器', link: '/components/function-editor' },
            { text: 'Custom 自定义组件', link: '/components/custom' }
          ]
        },
        {
          text: 'Hooks',
          items: [{ text: 'useFormInstance', link: '/useFormInstance' }]
        },
        {
          text: '更多',
          items: [
            { text: '类型声明', link: '/interface' },
            { text: '暗黑模式', link: '/dark' },
            { text: '二次开发指南', link: '/dev' },
            { text: '意见&建议&捐赠', link: '/advice' }
          ]
        }
      ],
      '/teach/': [
        {
          text: '教程',
          items: [
            { text: '读写表单数据', link: '/teach/vmodel' },
            { text: '提交表单', link: '/teach/submit' },
            { text: '函数传递', link: '/teach/func' },
            { text: '事件传递', link: '/teach/event' },
            { text: '深层数据绑定', link: '/deepName' }
          ]
        }
      ]
    }
  }
})
