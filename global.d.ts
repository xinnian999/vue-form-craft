declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    FormRender: (typeof import('vue-form-craft-4'))['FormRender']
    FormDesign: (typeof import('vue-form-craft-4'))['FormDesign']
  }
}

export {}
