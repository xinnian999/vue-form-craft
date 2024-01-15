import { ElLoading } from 'element-plus'

const loading = (app) => {
  app.directive('loading', ElLoading.directive)
}

export { loading }
export { default as selectLoadMore } from './selectLoadMore'
export { default as tableLoadMore } from './tableLoadMore'
