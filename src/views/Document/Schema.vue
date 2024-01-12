<template>
  <div class="md-container">
    <div class="md">
      <MdPreview v-model="text" editorId="start" />
    </div>
    <div class="catalog" v-if="scrollElement">
      <MdCatalog editorId="start" :scrollElement="scrollElement" />
    </div>
  </div>
</template>

<script setup lang="jsx">
import { watchEffect, ref } from 'vue'
import axios from 'axios'
import { useRoute } from 'vue-router'
import Test from '../Test.vue'
import render from '@/render'

const route = useRoute()

const text = ref('Hello Editor!')
const scrollElement = ref(null)

watchEffect(async () => {
  const { md } = route.meta

  const { data } = await axios(`/md/${md}`)
  text.value = data
  scrollElement.value = document.querySelector('.md-container')
  scrollElement.value.scrollTop = 0

  setTimeout(() => {
    render(Test, '.test')
  }, 500)
})
</script>

<style lang="less" scoped>
.md-container {
  display: flex;
  height: 100%;
  overflow: auto;
  .md {
    height: 100%;
    width: 100%;
    margin-right: 200px;
  }
  .catalog {
    padding-top: 30px;
    position: fixed;
    right: 0;
    width: 200px;
  }
}
</style>
