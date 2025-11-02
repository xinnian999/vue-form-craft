<template>
  <div :class="ns('form-design-right')">
    <div class="breadcrumb">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item class="breadcrumb-item" @click="designInstance.updateCurrentKey('root')"
          >表单</el-breadcrumb-item
        >
        <el-breadcrumb-item v-if="designInstance.currentKey !== 'root'">
          {{ designInstance.current?.label }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <AttrEdit v-if="designInstance.current" v-model="designInstance.current" />
  </div>
</template>

<script setup lang="ts">
import { useDesignInstance } from '@/hooks'
import { ns } from '@/utils'
import AttrEdit from './AttrEdit/index.vue'

const designInstance = useDesignInstance()!
</script>

<style lang="scss">
@import '@/style';

@include ns('form-design-right') {
  width: 350px;
  overflow: auto;

  .breadcrumb {
    padding: 10px;
    font-size: 12px;
    border-bottom: 1px solid #e5e2e2;

    .breadcrumb-item {
      cursor: pointer;
    }
  }

  @include ns('attr') {
    padding: 10px;
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
