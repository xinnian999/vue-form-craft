import type { FormSchema } from "@vue-form-craft/release";

export default {
  labelWidth: 150,
  labelAlign: 'right',
  size: 'default',
  items: [
    {
      label: '文章标题',
      component: 'Input',
      props: {
        placeholder: '请输入...'
      },
      designKey: 'form-MPd5',
      name: 'title',
      required: true
    },
    {
      label: '文章简介',
      component: 'Textarea',
      props: {
        autosize: {
          minRows: 4,
          maxRows: 999
        },
        placeholder: '请输入...'
      },
      designKey: 'form-ojdx',
      name: 'introduce'
    },
    {
      label: '标签',
      component: 'Checkbox',
      props: {
        mode: 'remote',
        options: [
          {
            label: '选项1',
            value: 'value1'
          },
          {
            label: '选项2',
            value: 'value2'
          },
          {
            label: '选项3',
            value: 'value3'
          }
        ],
        optionType: 'circle',
        space: 0,
        labelKey: 'name',
        valueKey: 'name',
        api: {
          url: '/current/query/tag',
          dataPath: 'data',
          method: 'GET',
          params: {},
          data: {}
        }
      },
      designKey: 'form-ri81',
      name: 'tag',
      required: true
    },
    {
      label: '文章类型',
      component: 'Radio',
      props: {
        mode: 'static',
        options: [
          {
            name: '原创',
            value: 1
          },
          {
            name: '转载',
            value: 2
          }
        ],
        optionType: 'circle',
        space: 0,
        labelKey: 'name',
        valueKey: 'value'
      },
      designKey: 'form-emNb',
      name: 'type',
      required: true
    },
    {
      label: '文章海报',
      component: 'UploadImage',
      props: {
        width: 250,
        height: 150,
        action: 'https://hyl999.co/api/upload/image',
        fileTypes: ['jpeg', 'png'],
        size: 5,
        uploadKey: 'image',
        dataPath: 'fileUrl'
      },
      designKey: 'form-YM6S',
      name: 'picture'
    },
    {
      label: '文章内容',
      component: 'Markdown',
      designKey: 'form-fSYT',
      name: 'content',
      required: true
    }
  ]
}  satisfies FormSchema
