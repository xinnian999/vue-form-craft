declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    SchemaForm: (typeof import('vue-form-craft'))['SchemaForm']
  }
}
