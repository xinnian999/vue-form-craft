import FormRender from '@/components/FormRender.vue'
import FormDesign from '@/components/FormDesign/index.vue'

declare module 'vue' {
  export interface GlobalComponents {
    FormRender: typeof FormRender
    FormDesign: typeof FormDesign
  }
}

export {}
