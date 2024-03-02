declare module 'vue' {
  export interface GlobalComponents {
    SchemaForm: (typeof import('vue-form-craft'))['SchemaForm']
  }
}
