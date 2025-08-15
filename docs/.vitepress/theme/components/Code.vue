<template>
  <div class="fm-code">
    <el-input v-model="value" placeholder="请输入验证码" />
    <el-button>发送验证码</el-button>
  </div>
</template>

<script setup lang="ts">
const value = defineModel<string>()
</script>

<style>
.fm-code {
  display: flex;
}
</style>
