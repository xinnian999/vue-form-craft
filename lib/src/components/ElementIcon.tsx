import { h } from 'vue'
import { Icon } from '@/components'

const iconStyle = {
  display: 'inline-block',
  width: '1em',
  height: '1em',
  overflow: 'hidden',
  fill: 'currentColor'
}

export default (props: { icon: any }) => {
  if (typeof props.icon === 'string') {
    return h(Icon, { name: props.icon })
  }
  return h(props.icon, { style: iconStyle })
}
