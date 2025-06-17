<template>
  <el-alert title="⭐⭐⭐⭐⭐" type="success">
    <div>
      相信你已经准备或正在使用 <b>form-magic</b> 进行开发工作了，在此之前，希望你可以去 Github
      或者 Gitee(码云) 帮我点个star ⭐ ，这将是对我极大的鼓励。
    </div>
    <p class="vfc-docs-star">
      <img @click="goGithub" src="https://img.shields.io/github/stars/xinnian999/form-magic" alt="github star" />
    </p>
    <p class="vfc-docs-star">
      <img @click="goGitee" src="https://gitee.com/mind251314/form-magic/badge/star.svg?theme=dark" alt="gitee star" />
    </p>
    
  </el-alert>
</template>

<script setup lang="ts">
const goGithub = () => {
  window.open('https://github.com/xinnian999/form-magic')
}

const goGitee = () => {
  window.open('https://gitee.com/mind251314/form-magic')
}
</script>

<style>
.vfc-docs-star {
  cursor: pointer;
}
</style>
