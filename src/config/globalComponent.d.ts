import SchemaForm from '@/components/SchemaForm.vue'

declare module 'vue' {
  export interface GlobalComponents {
    SchemaForm: typeof SchemaForm
  }
}

export {}
