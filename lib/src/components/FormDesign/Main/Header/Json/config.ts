import { cloneDeep } from 'lodash'
import type { FormSchema } from '@/types'
import { removeDesignKeys } from '@/utils'

export const tsVue = (schema: FormSchema) => {
  const schemaWithoutDesignKey = removeDesignKeys(cloneDeep(schema))
  const str = JSON.stringify(schemaWithoutDesignKey, null, 2)

  return `<template>
  <FormRender :schema="schema" @finish="onFinish" />
</template>

<script setup lang="ts">
import type { FormSchema } from 'formora'

const schema = ${str} satisfies FormSchema

const onFinish = (values: Record<string, any>) => {
  alert(JSON.stringify(values, null, 2))
}
</script>
`
}

export const jsVue = (schema: FormSchema) => {
  const schemaWithoutDesignKey = removeDesignKeys(cloneDeep(schema))
  const str = JSON.stringify(schemaWithoutDesignKey, null, 2)

  return `<template>
  <FormRender :schema="schema" @finish="onFinish" />
</template>

<script setup>
const schema = ${str}

const onFinish = (values) => {
  alert(JSON.stringify(values, null, 2))
}
</script>
`
}

export const tsJsonSchema = (schema: FormSchema) => {
  const schemaWithoutDesignKey = removeDesignKeys(cloneDeep(schema))
  const str = JSON.stringify(schemaWithoutDesignKey, null, 2)

  return `import type { FormSchema } from "formora";

export default ${str} satisfies FormSchema`
}

export const jsJsonSchema = (schema: FormSchema) => {
  const schemaWithoutDesignKey = removeDesignKeys(cloneDeep(schema))
  const str = JSON.stringify(schemaWithoutDesignKey, null, 2)

  return `export default ${str}`
}
