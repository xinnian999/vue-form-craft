<template>
  <div :class="ns('form-design-right')">
    <Tabs v-model="designInstance.rightTab">
      <TabPane v-if="designInstance.current" :label="locale.attr.tab1.title" name="attr">
        <AttrEdit v-model="designInstance.current" />
      </TabPane>
      <TabPane :label="locale.attr.tab2.title" name="form">
        <FormEdit />
      </TabPane>
    </Tabs>
  </div>
</template>

<script setup lang="ts">
import { useDesignInstance, useLocale } from '@form-magic/core'
import AttrEdit from './AttrEdit/index.vue'
import FormEdit from './FormEdit.vue'
import { ns, useComponents } from '@form-magic/core'
import { watch } from 'vue'

const { Tabs, TabPane } = useComponents()

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
