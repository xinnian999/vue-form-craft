import type { FormSchema } from '@/release'

export default (schema: FormSchema) => {
  const str = JSON.stringify(schema, null, 2)

  return `<template>
    <FormRender :schema="schema" footer  @onFinish="onFinish" />
</template>

<script setup>

const onFinish = (values) => {
  alert(JSON.stringify(values))
}

const schema = ${str}

</script>

`
}
