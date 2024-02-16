import IconRender from '@/components/IconRender.vue'

const icons = import.meta.glob('@/icons/*.vue', { eager: true })

const list = Object.entries(icons).map(([key]) => {
  return key.match(/\/([^\/]+)\.vue$/)[1]
})

const handle = ({ component, propKey, iconList }) => {
  return {
    component: component || IconRender,
    propKey: propKey || 'name',
    iconList: iconList || list
  }
}

export default handle
