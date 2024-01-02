<template>
  <div id="container">
    <header id="header">
      <div class="logo"><img src="./assets/logo.png" alt="" /></div>
      <el-menu mode="horizontal" class="nav" router :default-active="route.path">
        <el-menu-item index="/">首页</el-menu-item>
        <el-menu-item index="/formDesign">表单设计</el-menu-item>
      </el-menu>
    </header>
    <main id="content">
      <RouterView />
    </main>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
const route = useRoute()
</script>

<style lang="less">
@font-face {
  font-family: 'font';
  src: url('./assets/yezigongchangaoyehei.ttf');
}

body,
html {
  height: 100%;
}

* {
  margin: 0;
  /* padding: 0; */
}

#app {
  height: 100%;
}

#container {
  height: 100%;
  display: flex;
  flex-direction: column;
  #header {
    display: flex;
    width: 100%;
    height: 60px;
    justify-content: space-between;
    border-bottom: 1px solid #eee;
    .logo {
      width: 200px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .nav {
      min-width: 250px;
    }
  }
  #content {
    // flex: 1;
    height: calc(100% - 61px);
  }
}
</style>
