<template>
  <form-item class="inline-container" v-if="component === 'inline'" v-bind="thisProps">
    <FormRender v-model="formValues" :formItems="children" />
  </form-item>
</template>

<script setup>
import { computed, defineProps, inject } from 'vue'
import FormRender from '../FormRender.vue'
import FormItem from '../FormItem.vue'

const thisProps = defineProps({
  label: String,
  name: String,
  component: String,
  required: Boolean,
  props: Object,
  modelValue: null,
  initialValue: null,
  children: Array,
  hideLabel: Boolean
})

const formValues = inject('$formValues')

const align = computed(() => thisProps.props.align)
</script>

<style lang="less">
.inline-container {
  .el-form-item__content {
    justify-content: v-bind(align);
  }
}
</style>
