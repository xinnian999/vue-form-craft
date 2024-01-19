<template>
  <div class="grid">
    <form-render v-model="formValues" :formItems="children" />
  </div>
</template>

<script setup>
import { defineProps, computed, inject } from 'vue'
import FormRender from '../FormRender.vue'

const thisProps = defineProps({
  props: Object,
  children: Array
})

const formValues = inject('$formValues')

const colCount = computed(() => thisProps.props?.colCount)
const colSpace = computed(() => thisProps.props?.space + 'px')
</script>

<style scoped>
.grid {
  display: grid;
  gap: v-bind(colSpace);
  grid-template-columns: repeat(v-bind(colCount), 1fr);
}
</style>
