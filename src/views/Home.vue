<template>
  <div id="Home">
    <p class="title">vue-form-craft</p>
    <p class="desc">基于vue3 + elementPlus 开发的高效表单方案</p>
    <div class="actions">
      <el-button
        type="primary"
        size="large"
        round
        v-for="{ name, link, icon } in actions"
        :key="name"
        @click="goLink(link)"
      >
        <template #icon>
          <icon-render :name="icon"></icon-render>
        </template>
        {{ name }}</el-button
      >
    </div>

    <el-row :gutter="24" class="infos">
      <el-col :span="8" v-for="{ title, desc, icon } in infos" :key="title">
        <div class="grid-content">
          <p class="info-title"><icon-render :name="icon"></icon-render> {{ title }}</p>
          <p class="info-desc">{{ desc }}</p>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="jsx">
import { useRouter } from 'vue-router'
import { ElButton, ElRow, ElCol } from 'element-plus'

const router = useRouter()
const actions = [
  {
    name: '表单设计',
    link: '/formDesign',
    icon: 'design'
  },
  {
    name: '使用文档',
    link: '/document',
    icon: 'document'
  },
  {
    name: 'github',
    link: 'https://github.com/xinnian999/vue-form-craft',
    icon: 'github'
  }
]

const infos = [
  {
    title: '最大化减少表单开发成本',
    desc: '使用表单设计器 + 表单渲染器，拖拽即可组成各种复杂表单json',
    icon: 'design'
  },
  {
    title: '强大的联动系统',
    desc: 'json的任何字段都支持动态配置，表单联动更简单且高效',
    icon: 'design'
  },
  {
    title: '丰富的组件库',
    desc: '内置20多种表单组件和丰富的容器组件，支持添加自定义组件。',
    icon: 'library'
  }
]

const goLink = (link) => {
  if (link.includes('http')) {
    window.open(link)
  } else {
    router.push(link)
  }
}
</script>

<style lang="less">
#Home {
  margin-top: 60px;
  .title {
    text-align: center;
    font-family: 'font';
    font-size: 60px;
  }
  .desc {
    text-align: center;
    margin-top: 50px;
  }

  .actions {
    margin-top: 55px;
    text-align: center;
  }

  .grid-content {
    border-radius: 4px;
    min-height: 120px;
    background-color: #eee;
    margin-top: 50px;
    padding: 15px;
    p {
      margin-bottom: 1em;
    }
  }

  .infos {
    padding: 0 15vw;
    width: 100%;
    margin: 0 !important;
    .info-desc {
      color: #6a6868;
      font-size: 15px;
    }
  }
}
</style>
