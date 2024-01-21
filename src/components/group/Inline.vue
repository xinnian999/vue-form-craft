<template>
  <div class="inline-container"><FormRender v-model="formValues" :formItems="children" /></div>
</template>

<script setup>
import { computed, defineProps, inject } from 'vue'
import FormRender from '../FormRender.vue'

const thisProps = defineProps({
  props: Object,
  children: Array
})

const formValues = inject('$formValues')

const align = computed(() => thisProps.props.align)
const margin = computed(() => thisProps.props.margin + 'px')
const autoWrap = computed(() => (thisProps.props.autoWrap ? 'wrap' : 'nowrap'))
</script>

<style lang="less">
.inline-container {
  width: 100%;
  display: flex;
  justify-content: v-bind(align);
  flex-wrap: v-bind(autoWrap);
  overflow-x: auto;

  & > * {
    margin-right: v-bind(margin);
  }
}
</style>
