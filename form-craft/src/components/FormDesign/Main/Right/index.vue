<template>
  <div :class="ns('form-design-right')">
    <el-tabs v-model="designInstance.rightTab" type="border-card" :class="ns('form-design-tabs')">
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
import { watch } from 'vue'
import { useDesignInstance, useLocale } from '@/hooks'
import { ns } from '@/utils'
import AttrEdit from './AttrEdit/index.vue'
import FormEdit from './FormEdit.vue'

const locale = useLocale()

const designInstance = useDesignInstance()!

watch(
  () => designInstance.current,
  (val) => {
    if (!val) {
      designInstance.rightTab = 'form'
    }
  }
)
</script>

<style lang="scss">
@import '@/style';

@include ns('form-design-right') {
  width: 350px;
  overflow: auto;

  @include ns('attr') {
    padding: 5px;
    padding-bottom: 20px;

    @include ns('linkageConfig') {
      padding-top: 30px;
      &-btns {
        text-align: center;
      }
    }

    @include ns('style-config') {
      padding-top: 20px;

      .more {
        text-align: center;
      }
    }
  }
}
</style>
