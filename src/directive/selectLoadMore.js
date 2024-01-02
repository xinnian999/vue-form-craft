import { nextTick } from 'vue'

const loadMore = (app) => {
  app.directive('selectLoadMore', {
    mounted: function (el, binding) {
      nextTick(() => {
        const dom = el.querySelector('.el-select-dropdown .el-select-dropdown__wrap') // 获取下拉框元素
        dom.addEventListener('scroll', function () {
          // 监听元素触底
          const condition = this.scrollHeight - this.scrollTop - 5 <= this.clientHeight

          if (condition) {
            binding.value()
          }
        })
      })
    }
  })
}

export default loadMore
