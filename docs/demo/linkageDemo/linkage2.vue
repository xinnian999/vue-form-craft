<template>
  <FormRender :schema="schema" @finish="finish" />
</template>

<script setup lang="ts">
const schema = {
  labelWidth: 150,
  labelAlign: 'right',
  submitBtn: true,
  size: 'default',
  items: [
    {
      label: '分类',
      component: 'Radio',
      componentProps: {
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
        labelKey: 'name',
        valueKey: 'name',
        type: 'button',
        api: {
          url: '/current/query/category',
          params: {},
          data: {},
          dataPath: 'data',
          method: 'GET'
        },
        autoSelectedFirst: true,
        direction: 'horizontal'
      },
      name: 'category',
      required: true
    },
    {
      label: '文章',
      component: 'Radio',
      componentProps: {
        mode: 'remote',
        options: [],
        placeholder: '请选择文章',
        labelKey: 'title',
        valueKey: 'id',
        api: {
          url: '/current/query/article',
          params: {
            filters: {
              category: '{{$values.category}}'
            }
          },
          data: {},
          dataPath: 'data',
          method: 'GET'
        },
        type: 'circle',
        autoSelectedFirst: true,
        direction: 'vertical'
      },
      name: 'article',
      required: true,
      hidden: '{{!$values.category}}'
    }
  ]
}

const finish = (values: Record<string, any>) => {
  const data = JSON.stringify(values, null, 2)

  alert(data)
}
</script>
