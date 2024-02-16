<template>
  <FormDesign v-bind="$attrs" :schema="remoteSchema" ref="formRef" />
</template>

<script setup lang="jsx">
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

defineOptions({
  name: 'RemoteFormDesign'
})

const props = defineProps({
  schemaId: [String, Number]
})

const formRef = ref(null)

const instance = getCurrentInstance()

const remoteSchema = ref(null)

const loading = ref(false)

const { getSchema } = inject('$options')

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
