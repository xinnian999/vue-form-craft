<template>
  <div :style="InlineStyle">
    <FormRender :formItems="children" />
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
import useStyle from '@/hooks/useStyle'
import { FormRender } from '@/components'

const thisProps = defineProps({
  props: Object,
  children: Array
})

const InlineStyle = useStyle('Inline', thisProps.props)
</script>

<style></style>
