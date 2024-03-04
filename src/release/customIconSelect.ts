import IconRender from '@/components/IconRender.vue'
import type { iconSelectConfigType } from '@/config/commonType'

const icons = import.meta.glob('@/icons/*.vue', { eager: true })

const list = Object.entries(icons).map(([key]) => {
  const name = key.match(/\/([^\/]+)\.vue$/)
  return name && name[1]
})

const handle = ({ component, propKey, iconList }: iconSelectConfigType = {}) => {
  return {
    component: component || IconRender,
    propKey: propKey || 'name',
    iconList: iconList || list
  }
}

export default handle
