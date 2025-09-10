declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    FormRender: (typeof import('vue-form-craft'))['FormRender']
    FormDesign: (typeof import('vue-form-craft'))['FormDesign']
  }
}

export {}
