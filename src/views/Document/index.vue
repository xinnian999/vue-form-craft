<template>
  <div id="Document" :gutter="24">
    <div class="sideBar">
      <el-menu :default-active="route.path" class="sideBar-menu" router>
        <el-menu-item :index="path" :key="path" v-for="{ name, path } in menus">
          {{ name }}
        </el-menu-item>
      </el-menu>
    </div>
    <div class="content"><router-view /></div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { ElMenu, ElMenuItem } from 'element-plus'

const route = useRoute()

const menus = route.matched[0].children
</script>

<style lang="less">
#Document {
  height: 100%;
  display: flex;
  justify-content: space-between;
  .sideBar {
    width: 250px;
    .sideBar-menu {
      height: 100%;
    }
  }
  .content {
    width: calc(100% - 260px);
    height: 100%;
    overflow: hidden;
  }
}
.markdown {
  height: 100%;
}
</style>
