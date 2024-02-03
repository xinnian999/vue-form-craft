<template>
  <div :style="InlineStyle">
    <FormRender v-model="formValues" :formItems="children" />
  </div>
</template>

<script setup>
import { defineProps, inject } from 'vue'
import useStyle from '@/hooks/useStyle'
import { FormRender } from '@/components'

const formValues = inject('$formValues') || {}

const thisProps = defineProps({
  props: Object,
  children: Array
})

const InlineStyle = useStyle('Inline', thisProps.props)
</script>

<style></style>
