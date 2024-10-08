<template>
  <el-alert title="⭐⭐⭐⭐⭐" type="success">
    <div>
      相信你已经准备或正在使用 <b>vue-form-craft</b> 进行开发工作了，在此之前，希望你可以去 Github
      或者 Gitee(码云) 帮我点个star ⭐ ，这将是对我极大的鼓励。
    </div>
    <p class="vfc-docs-star">
      <img @click="goGithub" src="https://img.shields.io/github/stars/xinnian999/vue-form-craft" alt="github star" />
    </p>
    <p class="vfc-docs-star">
      <img @click="goGitee" src="https://gitee.com/mind251314/vue-form-craft/badge/star.svg?theme=dark" alt="gitee star" />
    </p>
    
  </el-alert>
</template>

<script setup lang="ts">
const goGithub = () => {
  window.open('https://github.com/xinnian999/vue-form-craft')
}

const goGitee = () => {
  window.open('https://gitee.com/mind251314/vue-form-craft')
}
</script>

<style>
.vfc-docs-star {
  cursor: pointer;
}
</style>
