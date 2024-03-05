import SchemaForm from '@/components/SchemaForm.vue'
import FormDesign from '@/components/FormDesign/index.vue'

declare module 'vue' {
  export interface GlobalComponents {
    SchemaForm: typeof SchemaForm
    FormDesign: typeof FormDesign
  }
}

export {}
