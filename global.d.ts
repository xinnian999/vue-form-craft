declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    SchemaForm: (typeof import('vue-form-craft'))['SchemaForm']
    FormDesign: (typeof import('vue-form-craft'))['FormDesign']
  }
}

export {}
