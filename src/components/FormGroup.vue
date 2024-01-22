<template>
  <div id="formGroup">
    <el-card v-if="component === 'card'" v-bind="props" :header="label">
      <form-render v-model="form" :formItems="children" />
    </el-card>

    <form-item v-if="component === 'formList'" v-bind="thisProps">
      <form-list
        v-model="formValues[name]"
        v-bind="props"
        :children="children"
        :title="label"
        :name="name"
      />
    </form-item>

    <item-group
      v-if="component === 'itemGroup'"
      v-model="formValues[name]"
      :children="children"
      :name="name"
    >
    </item-group>

    <Inline v-if="component === 'inline'" :children="children" v-bind="thisProps" />

    <Grid v-if="component === 'grid'" :children="children" v-bind="thisProps" />
  </div>
</template>

<script setup lang="jsx">
import { defineProps, computed, defineEmits } from 'vue'
import { ElCard } from 'element-plus'
import { mergeWith } from 'lodash'
import FormList from './group/FormList.vue'
import ItemGroup from './group/ItemGroup.vue'
import Inline from './group/Inline.vue'
import FormRender from './FormRender.vue'
import FormItem from './FormItem.vue'
import Grid from './group/Grid.vue'

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

const emit = defineEmits(['update:modelValue'])

const form = computed({
  get() {
    return thisProps.modelValue
  },
  set(val) {
    emit('update:modelValue', val)
  }
})

const formValues = computed(() => {
  return new Proxy(thisProps.modelValue, {
    set(target, key, value) {
      emit(
        'update:modelValue',
        mergeWith(target, { [key]: value }, (objValue, srcValue) => {
          if (Array.isArray(srcValue)) {
            return srcValue
          }
        })
      )
      return true
    }
  })
})
</script>

<style lang="less" scoped>
#formGroup {
  margin-bottom: 18px;
}
</style>
