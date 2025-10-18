declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    FormRender: (typeof import('form-craft'))['FormRender']
    FormDesign: (typeof import('form-craft'))['FormDesign']
  }
}

export { }
