import { computed } from 'vue'

const useStyle = (component, props) => {
  if (component === 'Grid') {
    return computed(() => ({
      display: 'grid',
      gap: props?.space + 'px',
      'grid-template-columns': `repeat(${props?.colCount}, 1fr)`
      // 'overflow-x': 'auto'
    }))
  }

  if (component === 'Inline') {
    return computed(() => ({
      width: '100%',
      display: 'flex',
      'justify-content': props.align,
      'flex-wrap': props.autoWrap ? 'wrap' : 'nowrap',
      'overflow-x': 'auto',
      gap: `${props.gap}px`
    }))
  }

  return ''
}

export default useStyle
