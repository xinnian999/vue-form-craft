<template>
  <el-button class="Button" v-bind="{ ...$attrs, ...props }" @click="onClick">{{ name }}</el-button>
</template>

<script setup>
import { defineProps, inject } from 'vue'
import { ElButton } from 'element-plus'

const formEvents = inject('$formEvents')

const props = defineProps({
  name: String,
  disabled: Boolean,
  type: {
    type: String,
    default: 'primary'
  },
  clickEvent: String,
  customEvent: Function,
  color: String
})

const onClick = () => {
  if (props.clickEvent === 'submitForm') {
    formEvents.submit()
  }
  if (props.clickEvent === 'resetFieldsForm') {
    formEvents.resetFields()
  }
  if (props.clickEvent === 'custom') {
    props.customEvent()
  }
}
</script>

<style scoped>
.Button {
  /* background-color: v-bind(color); */
}
</style>
