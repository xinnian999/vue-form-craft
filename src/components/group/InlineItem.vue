<template>
  <el-form-item id="InlineItem">
    <FormRender v-model="form" :formItems="children" />
  </el-form-item>
</template>

<script setup lang="jsx">
import { defineProps, computed, defineEmits } from 'vue'
import { ElFormItem, ElSpace } from 'element-plus'
import FormRender from '../FormRender.vue'

const props = defineProps({
  label: String,
  name: String,
  component: String,
  required: Boolean,
  props: Object,
  modelValue: null,
  initialValue: null,
  style: Object,
  help: String,
  children: Array,
  hideLabel: Boolean
})

const emit = defineEmits(['update:modelValue'])

const form = computed({
  get() {
    return props.modelValue
  },
  set(val) {
    emit('update:modelValue', val)
  }
})
</script>

<style lang="less">
#InlineItem {
  width: 100%;
}
</style>
