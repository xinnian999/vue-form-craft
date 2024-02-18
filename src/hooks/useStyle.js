import { computed, watchEffect } from 'vue'

const useStyle = (component, thisProps) => {
  const style = computed(() => thisProps.props || {})

  if (component === 'Grid') {
    return computed(() => ({
      display: 'grid',
      'grid-template-columns': `repeat(${style.value.columns}, 1fr)`,
      'row-gap': style.value['row-gap'] + 'px',
      'column-gap': style.value['column-gap'] + 'px'
      // 'overflow-x': 'auto'
    }))
  }

  if (component === 'Inline') {
    return computed(() => ({
      width: '100%',
      display: 'flex',
      'justify-content': style.value.align,
      'flex-wrap': style.value.autoWrap ? 'wrap' : 'nowrap',
      'overflow-x': 'auto',
      gap: `${style.value.gap}px`
    }))
  }

  return ''
}

export default useStyle
