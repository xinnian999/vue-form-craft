<template>
  <SchemaForm v-loading="loading" v-bind="$attrs" :schema="remoteSchema" ref="formRef" />
</template>

<script setup>
import {
  ref,
  defineProps,
  defineExpose,
  inject,
  onBeforeMount,
  defineOptions,
  onMounted,
  getCurrentInstance
} from 'vue'
import SchemaForm from './SchemaForm.vue'
import { $global } from './symbol'

defineOptions({
  name: 'RemoteSchemaForm'
})

const props = defineProps({
  schemaId: [String, Number],
  schema: null
})

const formRef = ref(null)

const instance = getCurrentInstance()

const remoteSchema = ref({})

const loading = ref(false)

const { getSchema } = inject($global)

onBeforeMount(async () => {
  if (props.schemaId) {
    loading.value = true

    remoteSchema.value = await getSchema(props.schemaId)

    loading.value = false
  }
})

onMounted(() => {
  Object.entries(formRef.value).forEach(([key, value]) => {
    instance.exposed[key] = value
  })
})

defineExpose(instance.exposed)
</script>
