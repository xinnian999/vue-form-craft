<template>
  <div :class="ns('form-design-right')">
    <el-tabs v-model="designInstance.rightTab">
      <el-tab-pane v-if="designInstance.current" :label="locale.attr.tab1.title" name="attr">
        <AttrEdit v-model="designInstance.current" />
      </el-tab-pane>
      <el-tab-pane :label="locale.attr.tab2.title" name="form">
        <FormEdit />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import { useDesignInstance, useLocale } from '@/hooks'
import AttrEdit from './AttrEdit/index.vue'
import FormEdit from './FormEdit.vue'
import { ns } from '@/utils'
import { watch } from 'vue'

const locale = useLocale()

const designInstance = useDesignInstance()

watch(
  () => designInstance.current,
  (val) => {
    if (!val) {
      designInstance.rightTab = 'form'
    }
  }
)
</script>
