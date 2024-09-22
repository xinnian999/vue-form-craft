<template>
  <FormRender :schema="schema" footer @onFinish="onFinish"  />
</template>

<script setup lang="ts">
const schema = {
  labelWidth: 150,
  labelAlign: 'right',
  size: 'default',
  items: [
    {
      label: '分类',
      component: 'Radio',
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
        labelKey: 'name',
        valueKey: 'name',
        optionType: 'button',
        api: {
          url: '/current/query/category',
          params: {},
          data: {},
          dataPath: 'data',
          method: 'GET'
        },
        autoSelectedFirst: true,
        direction: 'horizontal',
        space: 0
      },
      designKey: 'design-oGXW',
      name: 'category',
      required: true
    },
    {
      label: '文章',
      component: 'Radio',
      props: {
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
        optionType: 'circle',
        autoSelectedFirst: true,
        direction: 'vertical',
        space: 0
      },
      designKey: 'design-ojMx',
      name: 'article',
      required: true,
      hidden: '{{!$values.category}}'
    }
  ]
}

const onFinish = (values) => {
  alert(JSON.stringify(values, null, 2))
}
</script>
