<template>
  <div :class="namespace('form-design-current')">
    <el-tabs>
      <el-tab-pane v-if="designInstance.current" :label="locale.attr.tab1.title">
        <AttrEdit v-model="designInstance.current" />
      </el-tab-pane>
      <el-tab-pane :label="locale.attr.tab2.title">
        <FormEdit />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import { useDesignInstance, useLocale } from '@vue-form-craft/hooks'
import AttrEdit from './AttrEdit/index.vue'
import FormEdit from './FormEdit.vue'
import { namespace } from '@vue-form-craft/utils'

const locale = useLocale()

const designInstance = useDesignInstance()
</script>
